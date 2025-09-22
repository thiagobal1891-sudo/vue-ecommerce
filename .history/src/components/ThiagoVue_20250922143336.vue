<template>
  <div class="contenedor">
    <h2>Examen Thiago</h2>
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

.todo-list {
  text-align: left;
  width: 132px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  color: #1B4B66;
  margin: 20px auto 10px 0;;
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
  margin-bottom: 6px;
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
