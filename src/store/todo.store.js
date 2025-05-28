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

export default {
    initStore
}