import {Todo} from '../todos/models/todo.model'



const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state= {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra filosofal'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del conocimiento')
    ],
    filter: Filters.All
}

const initStore = () =>{
    console.log('InitStore');
    console.log(state);
}

const loadStore = ()=> {
    throw new Error('Not implemented');
}

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
 */
const addTodo = (description)=> {

        if(!description) throw new Error('Descripcion requerida');
        state.todos.push(new Todo(description));
        

}

const toggleTodo= (todoId)=>{
        state.todos= state.todos.map(todo=>{
            if(todo.id===todoId){
                todo.done= !todo.done;
            }
             return todo;
        });

}

const deleteTodo= (todoId)=>{
        state.todos=state.todos.filter(todo=> todo.id !== todoId)

}

const deleteCompleted= (todoId)=>{
        state.todos=state.todos.filter(todo=> todo.done)

}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter= (newFilter= Filters.All)=>{

        state.filter= newFilter;
}

const getCurrentFilter= ()=>{
        return state.filter;

}

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