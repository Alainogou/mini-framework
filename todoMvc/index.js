import MiniFramework from "../framework/framework.js";


export default class TodoMvc extends MiniFramework {
    constructor() {
        super();
        this.num = 30; // Utilisez this pour définir les propriétés de classe
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
        this.virtualDOM = this.htmlToVirtualDOM(this.html);

        // Définition des routes
        console.log("this.routes", window.location.href)
        this.route('/', () => {
            this.render(this.virtualDOM, document.getElementById('app'));
        });

        this.route('/active', () => {
            this.render(
                `<button onclick="app.navigate('/')">completed</button>`, 
                document.getElementById('app')
            );
        });

        // Navigation initiale
        this.navigate('/');
    }

    htmlToVirtualDOM(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        console.log(doc.body, "c'est doc")
        return this.elementToObject(doc.body);
    }

    elementToObject(element) {
        const obj = {
            tag: element.tagName.toLowerCase(),
            attrs: {},
            children: []
        };

        // Ajout des attributs
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            obj.attrs[attr.name] = attr.value;
        }

        // Ajout des enfants
        for (let i = 0; i < element.childNodes.length; i++) {
            const child = element.childNodes[i];
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                // Traitement du contenu textuel
                obj.children.push(child.textContent.trim());
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                obj.children.push(this.elementToObject(child));
            }
        }

        return obj;
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