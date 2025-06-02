

# 📝 Todo App - Lista de tareas en JavaScript

Este proyecto es una aplicación interactiva para gestionar tareas (Todo List) desarrollada con **JavaScript vanilla**. Permite crear, marcar como completadas, filtrar y eliminar tareas.
---

## 🔁 Lógica y estructura del proyecto

- Uso de **clases en JavaScript** para definir cada tarea con las propiedades: `id`, `descripcion` y `done`.
- **Control del estado global** (state) desde un único archivo que gestiona las tareas y filtros activos.
- Patrón **archivo barril** para exportar funciones desde un único punto.
- Generación de identificadores únicos con el paquete `uuid`.

---

## 🧩 Manipulación avanzada del DOM

- Inserción dinámica de tareas en el HTML mediante `createElement`, `appendChild` , `getAttribute`, etc.
- Asignación de clases y atributos para reflejar visualmente el estado de cada tarea.
- Actualización del contador de tareas pendientes en tiempo real.

---

## 🖱️ Eventos y flujo de interacción

- Captura de eventos como `keyup`, `click` y `submit` para responder a acciones del usuario.
- Filtros interactivos: ver **Todas**, solo las **Pendientes** o las **Completadas**.
- Botón de limpieza para eliminar tareas completadas.

---

## 💾 Persistencia con LocalStorage

- Las tareas se guardan en el navegador usando `localStorage`, lo que permite mantener los datos entre sesiones sin necesidad de backend.
- Al cargar la app, se recupera el estado anterior automáticamente.

---

## 🎨 Estilos y plantillas

- Estilo visual definido con **CSS** y estructura **HTML** a partir de recursos externos (créditos en el protpio HTML).
- Separación clara entre lógica y presentación.

---

## ▶️ Funcionamiento básico

1. Escribe una tarea y presiona **Enter** para añadirla.
2. Haz clic en una tarea para marcarla como **completada**.
3. Usa los **filtros** para mostrar tareas según su estado.
4. El botón **Eliminar Completadas** borra solo las finalizadas.

