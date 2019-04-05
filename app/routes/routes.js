'use strict';

module.exports = function(app) {
  var todoList = require('../controllers/controller');


  // todoList Routes
  app.get('/tasks', todoList.list_all_tasks)
  app.post('/tasks', todoList.create_a_task);
   
  app.get('/tasks/:taskId', todoList.read_a_task)
  app.put('/tasks/:taskId', todoList.update_a_task)
  app.delete('/tasks/:taskId', todoList.delete_a_task);
    };

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide task/status' });

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};