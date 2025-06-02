import {Todo} from '../todos/models/todo.model'

//Filtros que según selección muestran unos todos específicos

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

//Todos iniciales de prueba

const state= {
    todos: [
        new Todo('Ir a la compra'),
        new Todo('Estudiar'),
        new Todo('Quedar con los amigos'),
        
    ],
    filter: Filters.All
}


//

const initStore = () =>{
    loadStore();
    console.log('InitStore');
    console.log(state);
}


const loadStore = ()=> {
    //Comprobación de si existe algo en State dentro del localStore. Si no lo hay no hace nada
    if(!localStorage.getItem('state')) return;

    //Desestructuración que obtiene todos y filter después de parsear JSON de 'state' que tenemos en localStore
    const {todos=[], filter= Filters.All}= JSON.parse(localStorage.getItem('state'));

    //Le asigna estos valores extraidos a nuestro state local
    state.todos= todos;
    state.filter= filter;
}



const saveStateToLocalStorage= () =>{
    //Actualiza el state del localStorage con nuestro nuevo state local motivo por el que se llama a esta función en todas las funciones en las que se genera cambios en el state
    localStorage.setItem('state', JSON.stringify(state));
}


//Filtros que se usan para decidir que mostrar
const getTodos= (filter= Filters.All)=>{
    switch(filter){
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);

        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 * Añadimos con un push un nuevo todo a nuestro state
 */
const addTodo = (description)=> {

        if(!description) throw new Error('Descripcion requerida');
        state.todos.push(new Todo(description));
        saveStateToLocalStorage();
        

}

// Cambia el estado "done" de un todo según su id
// Recorre el array con map, invierte el valor de done si coincide el id

const toggleTodo= (todoId)=>{
        state.todos= state.todos.map(todo=>{
            if(todo.id===todoId){
                todo.done= !todo.done;
            }
             return todo;
        });

        saveStateToLocalStorage();

}


//Deja en el array solo los todos cuyo id es distinto del que se quiere eliminar
//Filter crear un nuevo array,  si el todoId es diferente devuelve true y el todo se queda de lo contrario será filtrado
const deleteTodo= (todoId)=>{
        state.todos=state.todos.filter(todo=> todo.id !== todoId)
        saveStateToLocalStorage();


}

//Se quedan aquellos todos cuyo valor en done sea falso
const deleteCompleted= (todoId)=>{
        state.todos=state.todos.filter(todo=> !todo.done)
        saveStateToLocalStorage();

}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter= (newFilter= Filters.All)=>{

        state.filter= newFilter;
        saveStateToLocalStorage();
}

const getCurrentFilter= ()=>{
        return state.filter;

}

//Exportamos los métodos para que puedan usarse en otros archivos

export default {
    getTodos,
    initStore,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    toggleTodo
}