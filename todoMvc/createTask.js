import renderTodos from "./renderTodo.js";

export default function handleCreateTask(event) {
    const task = event.target.value;
    if (task.trim() !== "" && task.trim().length !== 1) {
        const id = generateUniqueKey();
        const todo = {
            id: id,
            isCompleted: false,
            task: task,
        };
        this.state.push(todo);
        this.inputElement.value = '';
        renderTodos.call(this);
    }
}


function generateUniqueKey() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}