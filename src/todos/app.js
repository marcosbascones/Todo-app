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
        //Llamados renderTodos (ElementIDs.TodoList es la UL en el HTML que contiene la clase .todo-lust) (ver explicación en use-cases) y updatePendingCount 
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    //Se encarga de la actualización del contador
    const updatePendingCount= () => {
        //Consultar use-cases  se llama al elemento con la id que tiene el contador
        renderPending(ElementIDs.PendingCountLabel);
    }

    //Cuando la función App() se llama esto se invoca de manera automática
    //
    (()=>{
        //Creamos un div
        const app= document.createElement('div');
        //En ese div insertamos el HTML que hemos importado
        app.innerHTML= html;
        //Insertamos el HTML en el elemento "elementId" #app que hemos recibido en main.js 
        document.querySelector(elementId).append(app);
        //Se despliegan los todos
        displayTodos();
    })();

    //REFERENCIAS HTML se crea aquí porque si lo hago arriba no van a existir esas referencias debido a que no se ha ejecutado la funcionn anónima

    const newDescriptionInput= document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL= document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton= document.querySelector(ElementIDs.ClearCompleted);

    //Selecciona todos los elemmentos con la clase .filtro que es la que tienen los botones inferiores de filtrado 
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners Eventos

    //Añadir nueva tarea
    newDescriptionInput.addEventListener('keyup', (event)=>{
        //Se especifica que solo se ejecute en caso de que se pulse enter y exista algun valor en el input
        if (event.key !== 'Enter') return; 
        if(event.target.value.trim().length===0) return;

        todoStore.addTodo(event.target.value); 
        displayTodos();
        //Reinicia el valor del input a vacio
        event.target.value='';
    });

    //Cambio pendientes/realizadas
    todoListUL.addEventListener('click', (event)=>{
        //Se captura el elemento más cercano con el atributo data-id
        const element= event.target.closest('[data-id]');
        //Obtiene el valor del atributo data-id del elemento HTML y aplica el toggle
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    //Eliminación 
    todoListUL.addEventListener('click', (event)=>{
        //Establece un booleano para verificar si existe la clase destroy en el objeto seleccionado
        const isDestroyElement= event.target.className==='destroy';
        const element= event.target.closest('[data-id]');

        if(!isDestroyElement) return;
        //Si existe el destroy aplica el delete
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

       
    })

    //Eliminación de tareas completas
    clearCompletedButton.addEventListener('click', (event)=>{
        //Busca que tenga la clase clear completed en el botón que se va a pulsar
        const isDestroyElement= event.target.className==='clear-completed';

        if(!isDestroyElement) return;
        //*si la tiene aplica el deleteCompleted
        todoStore.deleteCompleted();
        displayTodos(); 
    })

    //Lógica del botón inferior
    filtersLIs.forEach(element=>{
        element.addEventListener('click', (element)=>{
            //Se pide que se elimine del class selected
            filtersLIs.forEach(el => el.classList.remove('selected'));
            //Añadir en el elemento seleccionado la clase selected
            element.target.classList.add('selected');
            //Según  el elemento seleccionado se aplica un filtro u otro para mostrar los elementos que estén en ese estado.
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

