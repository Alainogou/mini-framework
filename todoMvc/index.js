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

    // Fonction pour filtrer les tâches en fonction du filtre actuel
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

    // Dans votre classe TodoMvc, ajoutez une méthode pour obtenir le dernier élément de la liste filtrée
    getLastFilteredTodo() {
        const filteredTodos = this.filterTodos();
        return filteredTodos[filteredTodos.length - 1];
    }

    renderTodos = () => {
        
        const todoList = document.querySelector('.todo-list');

        todoList.innerHTML = '';

        let filtersTodos=this.filterTodos()
    
        const activeCount = this.state.filter(todo => !todo.isCompleted).length;
        const todoCountElement = document.querySelector('.todo-count');
        todoCountElement.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left!`;
        console.log(filtersTodos, "mes filters")
        filtersTodos.forEach((todo, index) => {
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
                                        console.log("yes")
                                        const li = checkbox.closest('li');
                                        if (checkbox.checked) {
                                            
                                            li.classList.add('completed');
                                            this.state[index].isCompleted = true;
                                            this.renderTodos()

                                        } else {
                                            li.classList.remove('completed');
                                            this.state[index].isCompleted = false;
                                            this.renderTodos()
                                        }
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
                this.saveState(); // Enregistrez l'état dans le stockage local
                this.renderTodos(); // Re-rendre la liste pour refléter les changements
            });

            // Ajoute todoItem à todoList
            todoList.appendChild(todoItem);
        });
         // Accéder au dernier élément de la liste filtrée
         const lastFilteredTodo = this.getLastFilteredTodo();
         // Affiche le dernier élément de la liste filtrée
         console.log("hello",lastFilteredTodo); 
     
    }
 
    handleChange(event) {
        const task = event.target.value;
        if (task.trim() !== "" && task.trim().length !== 1) {
            const id = this.idCounter++;
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

    // Méthode pour enregistrer l'état dans le stockage local
    saveState() {
        localStorage.setItem('todos', JSON.stringify(this.state));
    }

    load(){
        this.eventListener(this.inputElement, 'change', this.customBind(this.handleChange, this));
        this.eventListener( this.filterElement, 'click', this.customBind(this.handleNavigationClick, this));
        // Sélectionnez le bouton "Toggle All Input"
        const toggleAllButton = document.querySelector('.toggle-all');
    
        // Ajoutez un écouteur d'événements au bouton "Toggle All Input"
        toggleAllButton.addEventListener('change', (event) => {
            // Basculez l'état de complétion de tous les éléments de la liste
            this.state.forEach((todo, index) => {
                todo.isCompleted = event.target.checked;
            });

            // Re-rendre la liste pour refléter les changements
            this.renderTodos();
        });

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
