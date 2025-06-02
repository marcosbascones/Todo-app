//Import que nos permite generar id's aleatorios
import {v4 as uuid} from 'uuid';

export class Todo {

    /**
     * Clase padre con los elementos que conforman un todo.
     * @param {String} description 
     */
    constructor(description){
        this.id= uuid();
        this.description= description;
        this.done= false;
        this.createAt = new Date ();
    }
}