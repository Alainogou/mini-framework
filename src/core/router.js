// src/core/router.js



class Router {
    constructor() {
       this.routes = {};
    }
   
    addRoute(path, callback) {
       this.routes[path] = callback;
    }
   
    navigate(path) {
       if (this.routes[path]) {
         this.routes[path]();
       }
    }
}