class MiniFramework {
 constructor() {
    this.routes = {};
    this.state = {};
    this.eventListeners = {};
 }

 // Abstraction du système de routage DOM
 route(path, callback) {
    this.routes[path] = callback;
 }

 navigate(path) {
    const callback = this.routes[path];
    if (callback) {
      callback();
    }
 }

 // Gestion de l'état
 setState(key, value) {
    this.state[key] = value;
    this.emit('stateChanged', { key, value });
 }

 getState(key) {
    return this.state[key];
 }

 // Gestion des événements
 on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
 }

 emit(eventName, data) {
    const callbacks = this.eventListeners[eventName];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
 }

 // Fonction de rendu simple
 renders(component, container) {
    container.innerHTML = component;
 }

   render(component, container) {
      container.innerHTML = renderDOM(component);
   }
   // render(component, container) {
   //   /// Supposons que component retourne un objet représentant le DOM
   //    container.innerHTML = renderDOM(component);
   // }
}


// Exemple d'utilisation
const app = new MiniFramework();

// Définition des routes

// console.log(document.getElementById('app'))
// app.route('/', () => {
//  app.render(() => `
//     <h1>Home</h1>
//     <button onclick="app.navigate('/todos')">Go to Todos</button>
//  `, document.getElementById('app'));
// });

// app.route('/todos', () => {
//  app.render(() => `
//     <h1>Todos</h1>
//     <button onclick="app.navigate('/')">Go Home</button>
//  `, document.getElementById('app'));
// });

// // Gestion de l'état
// app.setState('user', { name: 'John Doe' });
// console.log(app.getState('user'));

// // Gestion des événements
// app.on('stateChanged', (data) => console.log(`State changed: ${data.key} = ${data.value}`));

// // Navigation initiale
let num=30
const html = `

   <section class="todoapp" id="root">
      <header class="header" >
         <h1>todos</h1>
         <div class="input-container">
            <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder="What needs to be done?" value="">
            <label class="visually-hidden" for="todo-input">New Todo Input</label>
         </div>
      </header>
      <main class="main" data-testid="main">
         <div class="toggle-all-container">
            <input class="toggle-all" type="checkbox" data-testid="toggle-all">
            <label class="toggle-all-label" for="toggle-all">Toggle All Input</label>
         </div>
         <ul class="todo-list" data-testid="todo-list">
            <li class="" data-testid="todo-item">
               <div class="view"><input class="toggle" type="checkbox" data-testid="todo-item-toggle">
               <label data-testid="todo-item-label">ee</label>
               <button class="destroy" data-testid="todo-item-button"></button>
               </div>
            </li>
         </ul>
      </main>
      <footer class="footer" data-testid="footer">
         <span class="todo-count">1 item left!</span>
         <ul class="filters" data-testid="footer-navigation">
            <li><a class="selected" href="#/">All</a></li>
            <button onclick="app.navigate('/active')">Go to Todos</button>
            <li><a class="" href="#/completed">Completed</a></li>
         </ul>
         <button class="clear-completed" disabled="">Clear completed</button>
      </footer>
   </section>
  
`;

const virtualDOM = htmlToVirtualDOM(html);


app.route('/', () => {
    app.render(htmlToVirtualDOM(html), document.getElementById('app'));

//     app.render({
//       tag: 'div',
//       attrs: { class: 'nameSubm' },
//       children: [
//           { tag: 'input', attrs: { type: 'text', placeholder: 'Insert Name' } },
//           { tag: 'input', attrs: { type: 'submit', placeholder: 'Submit' } }
//       ]
//   }, document.getElementById('app'));
});

app.route('/active', () => {
   app.renders(
      ` <button onclick="app.navigate('/')">completed</button>
      `, 
      document.getElementById('app'));

//     app.render({
//       tag: 'div',
//       attrs: { class: 'nameSubm' },
//       children: [
//           { tag: 'input', attrs: { type: 'text', placeholder: 'Insert Name' } },
//           { tag: 'input', attrs: { type: 'submit', placeholder: 'Submit' } }
//       ]
//   }, document.getElementById('app'));
});


// function renderDOM(domObject) {
//    let html = `<${domObject.tag}`;

//    // Ajout des attributs
//    for (const attr in domObject.attrs) {
//        html += ` ${attr}="${domObject.attrs[attr]}"`; // Ajout d'un espace avant chaque attribut
//    }

//    html += '>';

//    // Ajout des enfants
//    if (domObject.children) {
//        domObject.children.forEach(child => {
//            html += renderDOM(child);
//        });
//    }

//    html += `</${domObject.tag}>`;
//    return html;
// }

app.navigate('/'); 

function htmlToVirtualDOM(html) {
   const parser = new DOMParser();
   const doc = parser.parseFromString(html, 'text/html');
   console.log(doc.body, "c'est doc")
   return elementToObject(doc.body);
}


function elementToObject(element) {
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
           obj.children.push(elementToObject(child));
       }
   }

   return obj;
}

function renderDOM(domObject) {
   let html = `<${domObject.tag}`;

   // Ajout des attributs
   for (const attr in domObject.attrs) {
       html += ` ${attr}="${domObject.attrs[attr]}"`;
   }

   html += '>';

   // Ajout des enfants et du textContent
   domObject.children.forEach(child => {
       if (typeof child === 'string') {
           // Traitement du contenu textuel
           html += child;
       } else {
           html += renderDOM(child);
       }
   });

   html += `</${domObject.tag}>`;
   return html;
}



// const html = `
//    <div class="nameSubm">
//       <input type="text" placeholder="Insert Name" />
//       <input type="submit" placeholder="Submit" />
//    </div>
// `;

// const virtualDOM = htmlToVirtualDOM(html);
console.log(virtualDOM);