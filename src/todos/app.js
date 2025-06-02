import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'; // El ?raw indica a Vite que quiero exportar el texto plano
import { renderPending, renderTodos } from './use-cases';


//Ids que me permiten llamar a clases o id en el html
const ElementIDs={
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}


/**
 * 
 * @param {String} elementId 
 * 
 */
export const App = (elementId) => {


    const displayTodos=()=>{
        //Toma los todos que tienen un filtro determinado y los guardamos en la const todos
        const todos= todoStore.getTodos(todoStore.getCurrentFilter() );
        //Llamados renderTodos (ver explicación en use-cases) y updatePendingCount 
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount= () => {
        //Consultar use-cases
        renderPending(ElementIDs.PendingCountLabel);
    }

    //Cuando la función App() se llama esto se invoca de manera automática
    (()=>{
        const app= document.createElement('div');
        app.innerHTML= html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //REFERENCIAS HTML se crea aquí porque si lo hago arriba no van a existir esas referencias debido a que no se ha ejecutado la funcionn anónima

    const newDescriptionInput= document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL= document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton= document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if (event.key !== 'Enter') return; 
        if(event.target.value.trim().length===0) return;

        todoStore.addTodo(event.target.value); 
        displayTodos();
        event.target.value='';
    });

    todoListUL.addEventListener('click', (event)=>{
        const element= event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todoListUL.addEventListener('click', (event)=>{
        const isDestroyElement= event.target.className==='destroy';
        const element= event.target.closest('[data-id]');

        if(!isDestroyElement) return;
        
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

       
    })

    clearCompletedButton.addEventListener('click', (event)=>{
        const isDestroyElement= event.target.className==='clear-completed';

        if(!isDestroyElement) return;
        
        todoStore.deleteCompleted();
        displayTodos(); 
    })

    filtersLIs.forEach(element=>{
        element.addEventListener('click', (element)=>{
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch(element.target.text){

                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
            }

            displayTodos();

            });
        })

}

