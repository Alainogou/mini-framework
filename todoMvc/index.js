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

  }
  
}




export  class TodoMvcs extends MiniFramework {
    constructor() {
        super();
              
      
        this.state = this.state || [];

        this.html = `
            <section class="todoapp" >
                <header class="header" >
                    <h1>todos</h1>
                    <div class="input-container">
                        <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder="What needs to be done?" value="">
                        <label class="visually-hidden" for="todo-input">New Todo Input</label>
                    </div>
                </header>
                <main class="main">
                  <input class="toggle-all" type="checkbox" data-testid="toggle-all">
                </main>
                <footer class="footer" >
                    <span class="todo-count">1 item left!</span>
                    <ul class="filters" data-testid="footer-navigation">
                        <li><a class="selected" href="#/">All</a></li>
                        <li><a class="selected" href="#/active">Active</a></li>
                        <li><a class="" href="#/completed">Completed</a></li>
                    </ul>
                    <button class="clear-completed" disabled="">Clear completed</button>
                </footer>
            </section>
      `;

        
      // this.virtualDOM = this.htmlToVirtualDOM(this.html);
      this.vmobject={
        "tag": "div",
        "attrs": {},
        "children": [
          {
            "tag": "div",
            "attrs": {
              "class": "nameSubm"
            },
            "children": [
              {
                "tag": "input",
                "attrs": {
                  "type": "text",
                  "placeholder": "Insert Name"
                }
              },
              {
                "tag": "input",
                "attrs": {
                  "type": "submit",
                  "placeholder": "Submit"
                }
              }
            ]
          },

          {
            tag: 'button',
            attrs: {
                id: 'completetion'
            },
            children: [
                'call me'
            ]
          }

        ]
      }

      function getHashFromUrl() {
        const hash = window.location.hash;
        const hashValue = hash.substring(1);
        return hashValue;
      }


          
      function renderTodos(todos) {

        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = '';
        
        let alltodo=''
        //Parcourt chaque élément dans this.state
          todos.forEach(todo => {
            // Utilise this.createElement pour créer la structure HTML pour chaque todo
          
            const todoItem = this.createElement({
                tag: 'li',
                attrs: {
                    'data-testid': 'todo-item'
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
                                    'data-testid': 'todo-item-toggle'
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
            alltodo+=todoItem
            // Ajoute todoItem à todoList
            
            
        });
        todoList.innerHTML=alltodo
      }

      console.log(this.state, "sta")

      
       console.log("yes", getHashFromUrl()) 
       this.element=this.createElement(this.vmobject)
       
        console.log("this.routes", window.location.href)  
        // this.route('/', () => {
        //     this.render(this.html, document.getElementById('app'));
        //     this.render(this.element, document.getElementById('app1'));
        // });
        
        function waitForElement(selector, callback) {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
            } else {
                setTimeout(() => waitForElement(selector, callback), 100);
            }
        }
        
        // Utilisation
        waitForElement("#completetion", (dom) => {
            this.eventListener(dom, "click", (event)=>{
                console.log(event.currentTarget.getAttribute("href"), "une fois encore")
                alert("woo")
            })
            console.log("dom",this.eventListeners);
        });

        const inputElement = document.querySelector('.new-todo');
        let idCounter = 0;

        

        function handleChange(event) {
            const task = event.target.value;
            if (task.trim() !== "" && task.trim().length !== 1) {
                const id = idCounter++;
                const todo = {
                    id: id,
                    isCompleted: false,
                    task: task,
                };
                this.state.push(todo);

                inputElement.value = '';
                let domElement=this.createElement()
                renderTodos(this.state)
                console.log(this.state, "list todos");
            }
        }


        // Utilisation de customBind pour spécifier le contexte de this
        inputElement.addEventListener('change', this.customBind(handleChange, this));
       
        this.navigate('/');



    }

   
}
function createElement(domObject) {
  let html = `<${domObject.tag}`;

  // Ajout des attributs
  if (domObject.attrs){
     for (const attr in domObject.attrs) {
        html += ` ${attr}="${domObject.attrs[attr]}"`;
    }
 
  }
 
  html += '>';

  // Ajout des enfants et du textContent
  if ( domObject.children){
     domObject.children.forEach(child => {
        if (typeof child === 'string') {
           // Traitement du contenu textuel
           html += child;
        } else {
           html += createElement(child);
        }
     });
  }
     

  html += `</${domObject.tag}>`;
  
  return html;
}

const todoApp = new TodoMvc();
todoApp.load()


