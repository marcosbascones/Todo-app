import './style.css'
import { App } from './src/todos/app'
import todoStore from './src/store/todo.store'


//Función que recargará el contenido cada vez que exista una actualización
todoStore.initStore();

//Se indica el elemento HTML donde se quiere desplegar toda nuestra aplicación
App('#app');