// Importer le mini-framework

// Initialiser l'état de l'application
app.setState('todos', []);

// Fonctions pour gérer les tâches
function addTodo(todo) {
    const todos = app.getState('todos');
    todos.push(todo);
    app.setState('todos', todos);
}

function markTodoAsDone(index) {
    const todos = app.getState('todos');
    if (todos[index]) {
        todos[index].done = true;
        app.setState('todos', todos);
    }
}

function removeTodo(index) {
    const todos = app.getState('todos');
    if (todos[index]) {
        todos.splice(index, 1);
        app.setState('todos', todos);
    }
}

// Afficher les tâches
function displayTodos() {
    const todos = app.getState('todos');
    console.log('Todos:');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.text} - ${todo.done ? 'Done' : 'Not Done'}`);
    });
}

// Exemple d'utilisation
addTodo({ text: 'Learn JavaScript' });
addTodo({ text: 'Build a mini-framework' });
displayTodos();

markTodoAsDone(0);
displayTodos();

removeTodo(1);
displayTodos();