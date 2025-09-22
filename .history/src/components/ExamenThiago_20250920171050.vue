<template>
  <div class="container">
    <h1 class="title">Listado de Tareas - Juan Pérez</h1>

    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <span class="todo-title">{{ todo.title }}</span>
        <span class="todo-status">
          {{ todo.completed ? 'Completada' : 'Pendiente' }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import ExamenThiago from "../components/ExamenThiago.vue"
import { ref, onMounted } from "vue"

export default {
  name: 'ExamenThiago',
  data() {
    return {
    }
  }
}

const todos = ref([])

onMounted(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos")
  todos.value = await res.json()
})
</script>

<style>
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f3f3f3;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: #ffdddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  background-color: #ddffdd;
}

.todo-title {
  flex: 1;
  margin-right: 10px;
}

.todo-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  background-color: #d9534f;
}

.todo-item.completed .todo-status {
  background-color: #5cb85c;
}
</style>
