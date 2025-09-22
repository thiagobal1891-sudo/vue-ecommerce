<template>
  <div class="contenedor">
    <h2>Examen FrontEnd- Thiago Baltrons</h2>
    <ul class="todo-list">
  <li
  v-for="todo in todos"
  :key="todo.id"
  :class="{ completed: todo.completed }">
  <span><strong>{{ todo.id }}</strong> - {{ todo.title }}</span>
  <span class="status">
    {{ todo.completed ? "✔ Completada" : "⏳ Pendiente" }}
  </span>
  </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ExamenThiago",
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        this.todos = data
      })
  }
}
</script>

<style>
.contenedor {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 6px;
  font-family: Arial, sans-serif;
}

.contenedor h2 {
  text-align: left;
  font-size: 34px;
  color: #fff;
  margin: auto 20px;
  white-space: nowrap;
  text-shadow: 
  2px 0 0 black,  
  2px 0 0 black;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 20px 6px;
  border-radius: 5px;
  background: #ffe0e0;
}

.todo-list li.completed {
  background: #d4ffd4;
}

.status {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  background: #555;
  color: #fff;
}
</style>
