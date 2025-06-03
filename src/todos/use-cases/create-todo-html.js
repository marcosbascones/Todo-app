
import { Todo } from "../models/todo.model";


/**
 * 
 * @param {Todo} todo 
 */

export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('Un objeto Todo es requerido');

    //Fragmento HTML a añadir
    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.done ? 'checked': ''}>
                    <label>${todo.description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `;
    //Se crear un li ya que todo esto esta dándose dentro de una ul
    const liElement = document.createElement('li');
    //Se inserta el HTML previamente creado
    liElement.innerHTML = html;
    
    //Se añade un atributo llamado data-id que recibirá el valor del todo.id
    liElement.setAttribute('data-id', todo.id);

    //Si el todo está marcado como completado se añade la clase completed
    if(todo.done){
            liElement.classList.add('completed');

    }

    return liElement;


}