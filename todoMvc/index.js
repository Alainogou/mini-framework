import MiniFramework from "../framework/framework.js";


export default class TodoMvc extends MiniFramework {
    constructor() {
        super();
              

       
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


      
      
       this.element=this.createElement(this.vmobject)
        // Définition des routes
        console.log("this.routes", window.location.href)
        this.route('/', () => {
            this.render(this.html, document.getElementById('app'));
            this.render(this.element, document.getElementById('app1'));
        });
        
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
            this.eventListeners=dom
            this.eventListener(dom, "click", ()=>{
                alert("woo")
            })
            console.log("dom",this.eventListeners);
        });
        // this.on("click", ()=>{
        //     alert('waoo')
        // })

        // this.route('/active', () => {
        //     this.renders(
        //         `<button id="mybutton">completed</button>`, 
        //         document.getElementById('app')
        //     );
        // });

        // Navigation initiale
        this.navigate('/');
    }

   
}

const todoApp = new TodoMvc();
    

 // <div class="toggle-all-container">
                    //     <input class="toggle-all" type="checkbox" data-testid="toggle-all">
                    //     <label class="toggle-all-label" for="toggle-all">Toggle All Input</label>
                    // </div>
                    // <ul class="todo-list" data-testid="todo-list">
                    //     <li class="" data-testid="todo-item">
                    //         <div class="view">
                    //             <input class="toggle" type="checkbox">
                    //             <label> ee</label>
                    //             <button class="destroy" data-testid="todo-item-button"></button>
                    //         </div>
                    //     </li>
                    // </ul>