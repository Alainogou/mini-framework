import MiniFramework from "../framework/framework.js";
import handleCreateTask from "./createTask.js";
import renderTodos from "./renderTodo.js";



export default class TodoMvc extends MiniFramework {
    constructor() {
        super();
        
        this.state = this.state || [];
        this.inputElement = document.querySelector('.new-todo');
        this.idCounter = 0
        this.currentFilter = 'all';
        this.filterElement=document.querySelector('.filters')
        this.footerMenu=document.querySelector('.footer');

       
        this.footerMenu.classList.add('hidden');

        const toggle = document.querySelector('.toggle-all-container');
        toggle.classList.add('hidden');

        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    

    filterTodos() {
        switch (this.route) {
            case 'active':
                return this.state.filter(todo => !todo.isCompleted);
            case 'completed':
                return this.state.filter(todo => todo.isCompleted);
            default:
                return this.state; // 'all' ou tout autre cas, retourne toutes les tâches
        }
    }
   
    


    // Méthode pour enregistrer l'état dans le stockage local
    
    handleClearCompleted(event) {
        event.preventDefault(); 
        this.state = this.state.filter(todo => !todo.isCompleted);
        renderTodos.call(this);;
    }

    load(){
        this.eventListener(this.inputElement, 'change', (event) =>this.customBind(handleCreateTask.call(this, event), this));

        this.eventListener( this.filterElement, 'click', (event)=>{
            
            const currentRoutes = event.target.getAttribute('href').replace('#/', ''); 
            
            this.navigate(currentRoutes, ()=>{
                const navigationLinks = document.querySelectorAll('.filters a');
                navigationLinks.forEach(link => link.classList.remove('selected'));
                event.target.classList.add('selected');
                renderTodos.call(this);; 
            })
        });



        const toggleAllButton = document.querySelector('.toggle-all');
        this.eventListener(toggleAllButton, 'change', (event) => {
            this.state.forEach((todo, index) => {
                todo.isCompleted = event.target.checked;
            });
             renderTodos.call(this);;
        } )
       
        const clearCompletedButton = document.querySelector('.clear-completed');
        this.eventListener(  clearCompletedButton, 'click', this.customBind(this.handleClearCompleted, this));


      
    }
  
}

const todoApp = new TodoMvc();
todoApp.load()

