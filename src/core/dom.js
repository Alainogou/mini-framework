// src/core/dom.js
class DOM {
    createElement(tag, attrs = {}, children = []) {
       const element = document.createElement(tag);
       Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
       children.forEach(child => {
         if (typeof child === 'string') {
           element.appendChild(document.createTextNode(child));
         } else {
           element.appendChild(child);
         }
       });
       return element;
    }
   }