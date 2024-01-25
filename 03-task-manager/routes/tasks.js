const express = require('express');
const route = express.Router();

// destructure all tasks
const { 
    getAllTasks,
    createTasks,
    getTasks,
    updateTask,
    deleteTask
 } = require('../controllers/tasks');

// old method
// route.route('/').get((req, res) => {
//     res.send('all items');
// });

route.route('/').get(getAllTasks).post(createTasks);
route.route('/:id').get(getTasks).patch(updateTask).delete(deleteTask);

module.exports = route;