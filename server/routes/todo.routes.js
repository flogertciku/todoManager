const TodoController = require('../controllers/todo.controllers');
const getTodos = '/api/todo';
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.get(getTodos,authenticate, TodoController.getTodos); 
    app.post('/api/todo',authenticate, TodoController.createTodo);     /* This is new */
    app.patch('/api/todo/:id', authenticate,TodoController.changeState); 
}