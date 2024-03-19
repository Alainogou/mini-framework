import MiniFramework from "../framework/framework.js";


export default class TodoMvc extends MiniFramework {
  constructor() {
      super();
      
      this.state = this.state || [];
      this.inputElement = document.querySelector('.new-todo');
      this.idCounter=0
    
      // Appeler renderTodos pour initialiser l'affichage des todos
      this.renderTodos();
  }
  
  renderTodos = () => {
    // Sélectionne l'élément todoList
    const todoList = document.querySelector('.todo-list');

    // Vide la liste avant de la reconstruire
    todoList.innerHTML = '';

    // Parcourt chaque élément dans this.state
    this.state.forEach((todo, index) => {
        // Utilise this.createElement pour créer la structure HTML pour chaque todo
        const todoItem = this.creatDomElement({
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
                            },
                           
                            // Ajoute un écouteur d'événements pour l'événement 'change'
                            eventListeners: {
                                change: (event) => {
                                    const checkbox = event.target;
                                    const li = checkbox.closest('li');
                                    if (checkbox.checked) {
                                        
                                        li.classList.add('completed');
                                        this.state[index].isCompleted = true;

                                    } else {
                                        li.classList.remove('completed');
                                        this.state[index].isCompleted = false;

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

        // Ajoute todoItem à todoList
        todoList.appendChild(todoItem);
    });
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
         
          this.renderTodos()
          console.log(this.state, "list todos");
      }
  }

  load(){
    this.inputElement.addEventListener('change', this.customBind(this.handleChange, this));

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
  }
  
}


const todoApp = new TodoMvc();
todoApp.load()
