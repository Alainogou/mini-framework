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

   createElement(domObject) {
      
      let html = `<${domObject.tag}`;
   
      // Ajout des attributs
      if (domObject.attrs)
      for (const attr in domObject.attrs) {
          html += ` ${attr}="${domObject.attrs[attr]}"`;
      }
   
      html += '>';
   
      // Ajout des enfants et du textContent
      if ( domObject.children)
      domObject.children.forEach(child => {
          if (typeof child === 'string') {
              // Traitement du contenu textuel
              html += child;
          } else {
              html += this.createElement(child);
          }
      });
   
      html += `</${domObject.tag}>`;
      
      return html;
   }
   
    // Fonction de rendu simple
   render(component, container) {
      container.innerHTML = component;
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
   
   
   
// function renderDOM(domObject) {
//       let html = `<${domObject.tag}`;
   
//       // Ajout des attributs
//       for (const attr in domObject.attrs) {
//           html += ` ${attr}="${domObject.attrs[attr]}"`;
//       }
   
//       html += '>';
   
//       // Ajout des enfants et du textContent
//       domObject.children.forEach(child => {
//           if (typeof child === 'string') {
//               // Traitement du contenu textuel
//               html += child;
//           } else {
//               html += renderDOM(child);
//           }
//       });
   
//       html += `</${domObject.tag}>`;
//       return html;
// }
   


// function htmlToVirtualDOM(html) {
//    const parser = new DOMParser();
//    const doc = parser.parseFromString(html, 'text/html');
//    console.log(doc.body, "c'est doc")
//    return elementToObject(doc.body);
// }

// function elementToObject(element) {
//    const obj = {
//        tag: element.tagName.toLowerCase(),
//        attrs: {},
//        children: []
//    };

//    for (let i = 0; i < element.attributes.length; i++) {
//        const attr = element.attributes[i];
//        obj.attrs[attr.name] = attr.value;
//    }

//    for (let i = 0; i < element.childNodes.length; i++) {
//        const child = element.childNodes[i];
//        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
//            // Traitement du contenu textuel
//            obj.children.push(child.textContent.trim());
//        } else if (child.nodeType === Node.ELEMENT_NODE) {
//            obj.children.push(elementToObject(child));
//        }
//    }

//    return obj;
// }