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
 render(component, container) {
    container.innerHTML = component();
 }
}

// Exemple d'utilisation
const app = new MiniFramework();

// Définition des routes
app.route('/', () => {
 app.render(() => `
    <h1>Home</h1>
    <button onclick="app.navigate('/todos')">Go to Todos</button>
 `, document.getElementById('app'));
});

app.route('/todos', () => {
 app.render(() => `
    <h1>Todos</h1>
    <button onclick="app.navigate('/')">Go Home</button>
 `, document.getElementById('app'));
});

// Gestion de l'état
app.setState('user', { name: 'John Doe' });
console.log(app.getState('user'));

// Gestion des événements
app.on('stateChanged', (data) => console.log(`State changed: ${data.key} = ${data.value}`));

// Navigation initiale
app.navigate('/');