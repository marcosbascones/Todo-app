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
        new Todo('Piedra del tiempo')
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

/**
 * 
 * @param {String} description 
 */
const addTodo = (description)=> {
        throw new Error('Not implemented');

}

const toggleTodo= (todoId)=>{
        throw new Error('Not implemented');

}

const deleteTodo= (todoId)=>{
        throw new Error('Not implemented');

}

const deleteCompleted= (todoId)=>{
        throw new Error('Not implemented');

}

const setFilter= (newFilter= Filters.All)=>{
        throw new Error('Not implemented');

}

const getCurrentFilter= ()=>{
        throw new Error('Not implemented');

}

export default {
    initStore,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    toggleTodo
}