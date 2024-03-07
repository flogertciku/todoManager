const Todo=require ('../models/todo.models');
const User=require ('../models/user.models');
const mongoose = require('mongoose');
module.exports.createTodo = (request, response) => {
  console.log(request.body);
    let userFromDb = {};
  // const id = new mongoose.Types.ObjectId(request.body.creator);
       User.findOne({_id:request.body.creator})
       .then(user => 
        Todo.create(request.body).then(todo => {
          user.todos.push(todo);
          user.save({validateBeforeSave: false});
          todo.creator = user;
          todo.save({validateBeforeSave: false});
          console.log(todo, user);
          response.json(todo);
        }
        )
        )
       .catch(err => {console.log(err);  return response.status(400).json(err)});
      request.body.creator = userFromDb._id;
      console.log(userFromDb);
      // Todo.create(request.body) 
      //   .then(todo => 
      //     {todo.creator = userFromDb._id;
      //     todo.save()
      //    response.json(todo)
      //   console.log(todo)})
      //   .catch(err => response.status(400).json(err));
}
module.exports.getTodos = (request, response) => {
  Todo.find()
    .populate('creator')   
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