export default class MiniFramework {
    constructor() {
       this.routes ='';
       this.state = [];
       this.eventListeners = {};
    }
   
    // Abstraction du système de routage DOM
    route(path, callback) {
       this.routes[path] = callback;
    }


    navigate(newRoute, renderCallback) {
        if (typeof history !== 'undefined') {
          this.route = newRoute;
          renderCallback();
        } else {
          console.error('History API is not supported.');
        }
    }

    retrieveHashFromUrl() {
        
        const hash = window.location.hash;

        const cleanHash = hash.substring(1);

        this.routes=cleanHash
    }


    createDomElement = (domObject) => {
        let element = document.createElement(domObject.tag);
    
        // Ajout des attributs
        if (domObject.attrs) {
            for (const attr in domObject.attrs) {
                element.setAttribute(attr, domObject.attrs[attr]);
            }
        }
    
        // Ajout des écouteurs d'événements
        if (domObject.eventListeners) {
            for (const event in domObject.eventListeners) {
                element.addEventListener(event, domObject.eventListeners[event]);
            }
        }
    
        // Ajout des enfants
        if (domObject.children) {
            domObject.children.forEach(child => {
                if (typeof child === 'string') {
                    element.textContent = child;
                } else {
                    element.appendChild(this.createDomElement(child));
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

    
   
    // Gestion de l'état
    setState(key, value) {
       this.state[key] = value;
       this.emit('stateChanged', { key, value });
    }
   
    getState(key) {
       return this.state[key];
    }
   
    // Gestion des événements
    eventListener(element, eventName,  callback, options) {
       if (element && eventName) {
         element.addEventListener(eventName, callback,options )
         
       }
      // this.eventListeners[eventName].push(callback); 
    }
   

}
   
 