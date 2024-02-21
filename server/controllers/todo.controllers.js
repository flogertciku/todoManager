const Todo=require ('../models/todo.models');
module.exports.createTodo = (request, response) => {
      Todo.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}
module.exports.getTodos = (request, response) => {
  Todo.find()   
    .then(todos => response.json(todos))
    .catch(err => response.status(400).json(err));
}
module.exports.changeState = (request, response) => {
  Todo.findOne({_id:request.params.id})   
    .then(todo => 
      
     {
      todo.state = request.body.state;
      todo.save();
      response.json(todo)})
    .catch(err => response.status(400).json(err));
}