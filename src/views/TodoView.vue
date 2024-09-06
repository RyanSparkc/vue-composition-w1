<template>
  <div>
    <input type="text" v-model="text" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in showTodoList" :key="todo.id">
        <input type="checkbox" v-model="todo.isDone" />
        <input type="text" v-model="todo.text" @keyup.enter="saveTodo(todo.id)"
          v-if="todo.isEditing" />
        <span v-else :class="{ 'line-through': todo.isDone }" @dblclick="editTodo(todo.id)">{{
          todo.text }}</span>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <div>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'done'">Done</button>
      <button @click="filter = 'todo'">Todo</button>
    </div>
    <button @click="clearDone">Clear Done</button>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue';

const text = ref('');
const todoList = ref([]);

const localData = localStorage.getItem('todoList');

const addTodo = () => {
  if (text.value.trim() === '') return;
  todoList.value.push({
    id: Date.now(),
    text: text.value,
    isDone: false,
    isEditing: false
  });
  text.value = '';

};


// 移除指定資料
const removeTodo = (id) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
};

// 點兩下編輯指定資料 
// 一次只能編輯一筆資料
const editTodo = (id) => {
  // 先將所有資料的 isEditing 設為 false
  todoList.value.forEach((todo) => {
    todo.isEditing = false;
  });
  const todo = todoList.value.find((todo) => todo.id === id);
  todo.isEditing = true;
};

// 儲存編輯後的資料
const saveTodo = (id) => {
  const todo = todoList.value.find((todo) => todo.id === id);
  todo.isEditing = false;
};

// 自動儲存 localStorage watchEffect()
watchEffect(() => {
  const data = JSON.stringify(todoList.value);
  localStorage.setItem('todoList', data);
});

// 自動讀取 localStorage
onMounted(() => {
  if (localData) {
    todoList.value = JSON.parse(localData);
  }
});

// 清除所有已完成
const clearDone = () => {
  todoList.value = todoList.value.filter((todo) => !todo.isDone);
};


// 依據狀態顯示不同的資料
const filter = ref('all');
const showTodoList = computed(() => {
  return todoList.value.filter((todo) => {
    if (filter.value === 'all') {
      return true;
    } else if (filter.value === 'done') {
      return todo.isDone;
    } else if (filter.value === 'todo') {
      return !todo.isDone;
    }
  });
});


</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
