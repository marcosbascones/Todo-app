import { Todo } from "../models/todo.model"
import { createTodoHTML } from "./create-todo-html";
    
let element;

/**
 * Recibimos el elemento HTML donde renderizar y todos a introducir  
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos= (elementId, todos = [])=>{

    if(!element){
        element= document.querySelector(elementId);
    }

    if(!element) throw new Error(`Element ${elementId} not found`);

    //Se vacia el espacio en el que añadir los elementos
    element.innerHTML='';

    //TODO se le asigna el elementId creo que esta linea es redundante ya que se ha hecho antes
     element= document.querySelector(elementId);

    todos.forEach(todo => {
        //En cada todo añadir al element un createTodoHTML (ver método)
        element.append(createTodoHTML(todo));
    });
    

}