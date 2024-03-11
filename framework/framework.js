export default class MiniFramework {
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
      console.log(path)
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
   
   ;