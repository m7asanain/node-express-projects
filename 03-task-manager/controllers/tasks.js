const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    // res.send('Get All Tasks');
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error });   
    }
};

const createTasks = async (req, res) => {
    // res.send('Create Task');
    // res.json(req.body);
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });   
    }

}

const getTasks = async (req, res) => {
    // res.send('Get Single Task');
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            // make sure there is a 'return'. !task -> js will send responses.
            // if the id is wrong with character => this is the error
            return res.status(404).json({ msg: `No task with this id: ${taskID}!` });
        }
        res.status(200).json({ task });
    } catch (error) {
        // if the id is wrong with the number of character => this is the error
        res.status(500).json({ msg: error });   
    }
}

const deleteTask = async (req, res) => {
    // res.send('Delete Task');
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with this id: ${taskID}!` });
        }
        // res.status(200).json({ task });
        res.status(200).json({ task: null, status: 'success' });
    } catch (error) {
        res.status(500).json({ msg: error });   
    }
}

const updateTask = async (req, res) => {
    // res.send('Update Task');
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with this id: ${taskID}!` });
        }
        res.status(200).json({ id: taskID, data: req.body });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTask,
    deleteTask
}