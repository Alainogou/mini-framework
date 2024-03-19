import MiniFramework from "../framework/framework.js";


export default class TodoMvc extends MiniFramework {
    constructor() {
        super();
        
        this.state = this.state || [];
        this.inputElement = document.querySelector('.new-todo');
        this.idCounter = 0
        this.currentFilter = 'all';
        this.filterElement=document.querySelector('.filters')

        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    

    handleNavigationClick(event) {
    
        const filter = event.target.getAttribute('href').replace('#/', ''); 
        this.currentFilter = filter;
        const navigationLinks = document.querySelectorAll('.filters a');
        navigationLinks.forEach(link => link.classList.remove('selected'));
        event.target.classList.add('selected');
        this.renderTodos(); 
    }

   
    filterTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.state.filter(todo => !todo.isCompleted);
            case 'completed':
                return this.state.filter(todo => todo.isCompleted);
            default:
                return this.state; // 'all' ou tout autre cas, retourne toutes les tâches
        }
    }

<<<<<<< HEAD
    // Dans votre classe TodoMvc, ajoutez une méthode pour obtenir le dernier élément de la liste filtrée
    getLastFilteredTodo() {
        const filteredTodos = this.filterTodos();
        return filteredTodos[filteredTodos.length - 1];
    }
=======
   
>>>>>>> dfea5966aac20c5ff2f258cb9fb7b67d22fc5433

    renderTodos = () => {
        
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = '';

        let filtersTodos=this.filterTodos()
    
        const activeCount = this.state.filter(todo => !todo.isCompleted).length;
        const todoCountElement = document.querySelector('.todo-count');
        todoCountElement.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left!`;
        console.log(filtersTodos, "mes filters")
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
                                            // this.state[index].isCompleted = false;
                                            // this.renderTodos()
                                        }

                                        const element = this.state.find(item => item.id === todo.id);

                                        if (element) {
                                           
                                            element.isCompleted = !element.isCompleted;
                                            
                                        } else {
                                            console.error(`Element with key ${todo.id} not found.`);
                                        }
                                        this.renderTodos()
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
<<<<<<< HEAD
            
             // Utilisez la fonction eventListener pour ajouter l'écouteur d'événements au bouton destroy
             this.eventListener(todoItem.querySelector('.destroy'), 'click', () => {
                // Supprimez l'élément de la liste
                this.state.splice(index, 1); // Supprime l'élément à l'index spécifié
                this.saveState(); // Enregistrez l'état dans le stockage local
                this.renderTodos(); // Re-rendre la liste pour refléter les changements
            });

            // Ajoute todoItem à todoList
=======
            todoItem.addEventListener('dblclick', () => {
                this.editTodo(todo, index, todoItem);
            });
           
>>>>>>> dfea5966aac20c5ff2f258cb9fb7b67d22fc5433
            todoList.appendChild(todoItem);
        });
         // Accéder au dernier élément de la liste filtrée
         const lastFilteredTodo = this.getLastFilteredTodo();
         // Affiche le dernier élément de la liste filtrée
         console.log("hello",lastFilteredTodo); 
     
    }
  
    editTodo(todo, index, todoElement) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.task;
        input.className = 'edit'; 
        input.style.display = 'block';
        
        this.eventListener(input, 'keydown', (event) => {
            if (event.key === 'Enter') {
                todo.task = input.value;
                this.renderTodos(); 
            }
        });

        this.eventListener(
            document, 
            'click', 
            (event) => {
                if (event.target !== input) {
                    this.renderTodos();
                }
            }, 
            { once: true } //l'option { once: true } pour supprimer l'écouteur après le premier clic
        )
        // Remplace l'élément de la liste par le champ de saisie
        todoElement.replaceWith(input);
        input.focus()
    }

    
    generateUniqueKey() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    handleChange(event) {
        const task = event.target.value;
        if (task.trim() !== "" && task.trim().length !== 1) {
            const id = this.generateUniqueKey();
            const todo = {
                id: id,
                isCompleted: false,
                task: task,
            };
            this.state.push(todo);
            this.inputElement.value = '';
            this.saveState();
            this.renderTodos()
        }
    }

<<<<<<< HEAD
    // Méthode pour enregistrer l'état dans le stockage local
    saveState() {
        localStorage.setItem('todos', JSON.stringify(this.state));
=======
    handleClearCompleted(event) {
        event.preventDefault(); 
        this.state = this.state.filter(todo => !todo.isCompleted);
        this.renderTodos();
>>>>>>> dfea5966aac20c5ff2f258cb9fb7b67d22fc5433
    }

    load(){
        this.eventListener(this.inputElement, 'change', this.customBind(this.handleChange, this));
        this.eventListener( this.filterElement, 'click', this.customBind(this.handleNavigationClick, this));


        const toggleAllButton = document.querySelector('.toggle-all');
        this.eventListener(toggleAllButton, 'change', (event) => {
            this.state.forEach((todo, index) => {
                todo.isCompleted = event.target.checked;
            });
            this.renderTodos();
        } )
       
        const clearCompletedButton = document.querySelector('.clear-completed');
        this.eventListener(  clearCompletedButton, 'click', this.customBind(this.handleClearCompleted, this));


        // Ajoutez un écouteur d'événements global pour tous les boutons 'destroy'
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('destroy')) {
                const todoItem = event.target.closest('li');
                const index = Array.from(todoItem.parentNode.children).indexOf(todoItem);
                // Supprime l'élément à l'index spécifié
                this.state.splice(index, 1); 
                // Re-rendre la liste pour refléter les changements
                this.renderTodos(); 
            }
        });
    }
  
}

const todoApp = new TodoMvc();
todoApp.load()
