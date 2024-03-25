
export default  function renderTodos(){
        
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    let filtersTodos=this.filterTodos()

    const activeCount = this.state.filter(todo => !todo.isCompleted).length;
    const todoCountElement = document.querySelector('.todo-count');
    todoCountElement.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left!`;
    

    // Affichez le menu du footer si la liste n'est pas vide
    const toggle = document.querySelector('.toggle-all-container');
    if (filtersTodos.length === 0) {
        toggle.classList.add('hidden');
    } else {
        toggle.classList.remove('hidden');
    }

    const footerMenu = document.querySelector('.footer');
    if (filtersTodos.length > 0) {
        footerMenu.classList.remove('hidden');
        toggle.classList.remove('hidden');
    }

    const clearCompletedButton = document.querySelector('.clear-completed');
    const completedTodos = this.state.filter(todo => todo.isCompleted);
    if (completedTodos.length === 0) {
        clearCompletedButton.classList.add('hidden');
       
    } else {
        clearCompletedButton.classList.remove('hidden');
    }
    
    if (this.state.length===0){
        this.footerMenu.classList.add('hidden');
    }



    filtersTodos.forEach((todo, index) => {index
        // Utilise this.createElement pour créer la structure HTML pour chaque todo
        const todoItem = this.createDomElement({
            tag: 'li',
            attrs: {
                'data-testid': 'todo-item',
                class: todo.isCompleted ? 'completed' : ''
            },
            children: [
                {
                    tag: 'div',
                    attrs: {
                        class: 'view'
                    },
                    children: [     
                        {
                            tag: 'input',
                            attrs: {
                                class: 'toggle',
                                type: 'checkbox',
                                id: `item_${todo.id}`,
                                'data-testid': 'todo-item-toggle',
                                ...(todo.isCompleted ? { checked: true } : {})

                            },
                        
                            // Ajoute un écouteur d'événements pour l'événement 'change'
                            eventListeners: {
                                change: (event) => {
                                    const checkbox = event.target;
                                    
                                    const li = checkbox.closest('li');
                                    if (checkbox.checked) {
                                        
                                        li.classList.add('completed');

                                    } else {
                                        li.classList.remove('completed');
                                    }

                                    const element = this.state.find(item => item.id === todo.id);

                                    if (element) {
                                       
                                        element.isCompleted = !element.isCompleted;
                                        
                                    } else {
                                        console.error(`Element with key ${todo.id} not found.`);
                                    }
                                    renderTodos.call(this)
                                }
                            } 
                        },
                        {
                            tag: 'label',
                            attrs: {
                                'data-testid': 'todo-item-label'
                            },
                            children: [todo.task] // Utilise la propriété task du todo comme texte de la label
                        },
                        {
                            tag: 'button',
                            attrs: {
                                class: 'destroy',
                                'data-testid': 'todo-item-button'
                            }
                        }
                    ]
                }
            ]
        });

        // Utilisez la fonction eventListener pour ajouter l'écouteur d'événements au bouton destroy
        this.eventListener(todoItem.querySelector('.destroy'), 'click', () => {
            // Supprimez l'élément de la liste
            this.state.splice(index, 1); // Supprime l'élément à l'index spécifié
            renderTodos.call(this); // Re-rendre la liste pour refléter les changements
        });

        this.eventListener(todoItem, 'dblclick', () => {
            editTodo.call(this, todo, index, todoItem);
        });
       
       
        todoList.appendChild(todoItem);
    });
    
 
}






function editTodo(todo, index, todoElement) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.task;
    input.className = 'edit'; 
    input.style.display = 'block';
    
    this.eventListener(input, 'keydown', (event) => {
        if (event.key === 'Enter') {
            todo.task = input.value;
             renderTodos.call(this);; 
        }
    });

    this.eventListener(
        document, 
        'click', 
        (event) => {
            if (event.target !== input) {
                 renderTodos.call(this);;
            }
        }, 
        { once: true } //l'option { once: true } pour supprimer l'écouteur après le premier clic
    )
    // Remplacegit config pull.rebase false l'élément de la liste par le champ de saisie
    todoElement.replaceWith(input);
    input.focus()
}