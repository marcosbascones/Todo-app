(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function d(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=d(o);fetch(o.href,l)}})();const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function L(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}let b;const E=new Uint8Array(16);function S(){if(!b){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");b=crypto.getRandomValues.bind(crypto)}return b(E)}const v=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:v};function C(e,t,d){var o;if(T.randomUUID&&!e)return T.randomUUID();e=e||{};const i=e.random??((o=e.rng)==null?void 0:o.call(e))??S();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,L(i)}class y{constructor(t){this.id=C(),this.description=t,this.done=!1,this.createAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},s={todos:[new y("Ir a la compra"),new y("Estudiar"),new y("Quedar con los amigos")],filter:a.All},P=()=>{A(),console.log("InitStore"),console.log(s)},A=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done===!0);case a.Pending:return s.todos.filter(t=>t.done===!1);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Descripcion requerida");s.todos.push(new y(e)),g()},D=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},q=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},k=e=>{s.todos=s.todos.filter(t=>!t.done),g()},x=(e=a.All)=>{s.filter=e,g()},F=()=>s.filter,c={getTodos:I,initStore:P,addTodo:U,deleteTodo:q,deleteCompleted:k,setFilter:x,getCurrentFilter:F,toggleTodo:D},M=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
          \r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const N=e=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${e} not found`);f.innerHTML=c.getTodos(a.Pending).length},O=e=>{if(!e)throw new Error("Un objeto Todo es requerido");const t=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${e.done?"checked":""}>
                    <label>${e.description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `,d=document.createElement("li");return d.innerHTML=t,d.setAttribute("data-id",e.id),e.done&&d.classList.add("completed"),d};let m;const H=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${e} not found`);m.innerHTML="",m=document.querySelector(e),t.forEach(d=>{m.append(O(d))})},h={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const n=c.getTodos(c.getCurrentFilter());H(h.TodoList,n),d()},d=()=>{N(h.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=M,document.querySelector(e).append(n),t()})();const i=document.querySelector(h.NewTodoInput),o=document.querySelector(h.TodoList),l=document.querySelector(h.ClearCompleted),p=document.querySelectorAll(h.TodoFilters);i.addEventListener("keyup",n=>{n.key==="Enter"&&n.target.value.trim().length!==0&&(c.addTodo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{const u=n.target.closest("[data-id]");c.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{const u=n.target.className==="destroy",w=n.target.closest("[data-id]");u&&(c.deleteTodo(w.getAttribute("data-id")),t())}),l.addEventListener("click",n=>{n.target.className==="clear-completed"&&(c.deleteCompleted(),t())}),p.forEach(n=>{n.addEventListener("click",u=>{switch(p.forEach(w=>w.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();R("#app");
