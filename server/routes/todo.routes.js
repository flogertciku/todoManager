const TodoController = require('../controllers/todo.controllers');
module.exports = (app) => {
    app.get('/api/todo', TodoController.getTodos); 
    app.post('/api/todo', TodoController.createTodo);     /* This is new */
    app.patch('/api/todo/:id', TodoController.changeState); 
}