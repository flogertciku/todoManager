const us = require('../controllers/todo.controllers');
const UserControllers = require('../controllers/user.controllers');
const getTodos = '/api/todo';
module.exports = (app) => {
    app.get(getTodos, TodoController.getTodos); 
    app.post('/api/todo', TodoController.createTodo);     /* This is new */
    app.patch('/api/todo/:id', TodoController.changeState); 
}
module.exports = (app) => {   

    app.post('/api/register', UserControllers.register);
    app.post('/api/login', UserControllers.login);
    app.post('/api/logout', UserControllers.logout);
 }