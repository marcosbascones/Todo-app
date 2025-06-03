import todoStore, { Filters } from "../../store/todo.store";

//Método para actualizar el contador

//Inicialización de variable
let element;

/**
 * 
 * @param {String} elementId 
 */

export const renderPending =(elementId) =>{

    if(!element){
        element=document.querySelector(elementId);
    }

    if (!element) throw new Error(`Element ${elementId} not found`);

    //Se introduce el número que da como resultado la longitud del array que se obtiene tras hacer un get de los Pendientes.
    element.innerHTML = todoStore.getTodos(Filters.Pending).length;

}