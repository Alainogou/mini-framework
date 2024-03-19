export default class MiniFramework {
    constructor() {
       this.routes = {};
       this.state = [];
       this.eventListeners = {};
    }
   
    // Abstraction du système de routage DOM
    route(path, callback) {
       this.routes[path] = callback;
    }

   // Ajustez la méthode createElement dans MiniFramework pour qu'elle prenne en charge les écouteurs d'événements
creatDomElement(domObject) {
   const element = document.createElement(domObject.tag);

   // Ajout des attributs
   if (domObject.attrs) {
       for (const attr in domObject.attrs) {
           element.setAttribute(attr, domObject.attrs[attr]);
       }
   }

   // Ajout des écouteurs d'événements
   if (domObject.eventListeners) {
       for (const eventName in domObject.eventListeners) {
           element.addEventListener(eventName, domObject.eventListeners[eventName]);
       }
   }

   // Ajout des enfants et du textContent
   if (domObject.children) {
       domObject.children.forEach(child => {
           if (typeof child === 'string') {
               // Traitement du contenu textuel
               element.textContent += child;
           } else {
               element.appendChild(this.creatDomElement(child));
           }
       });
   }

   return element;
}

   // Fonction de rappel pour l'événement 'change'
   customBind(fn, context) {
      return function(...args) {
          return fn.apply(context, args);
      };
    }
   
    // Fonction de rendu simple
   render(component, container) {
      container.appendChild(component)
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
    eventListener(element, eventName,  callback) {
       if (element && eventName) {
         element.addEventListener(eventName, callback )
         
       }
      // this.eventListeners[eventName].push(callback); 
    }
   
    emit(eventName, data) {
       const callbacks = this.eventListeners[eventName];
       if (callbacks) {
         callbacks.forEach(callback => callback(data));
       }
    }
}
   
 