<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref("");
const password = ref("");

async function login() {
  try {
    const response = await axios.post('/api/auth/login', {
      username: username.value,
      password: password.value,
    });
    await router.push('/');
  } catch {
    console.log("Didnt work");
  }
}
</script>

<template>
  <div class="main">
    <h1>Cali Track</h1>
    <p>Please log in to proceed</p>
    <div class="secondary">
      <label for="username">Username</label>
      <input v-model="username" type="text" id="username" class="fields">
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" class="fields">
    </div>
    <button @click="login()" class="login-btn">Login</button>
  </div>
</template>

<style scoped>
.main {
  border: 5px solid rgb(109, 31, 255);
  padding: 50px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(25, 25, 25);

  h1 {
    background-image: linear-gradient(to right, rgb(136, 72, 255), rgb(55, 123, 250));
    background-clip: text;
    font-size: 2.5rem;
    font-weight: bold;
    color: transparent;
  }
}

.secondary {
  padding: 30px;
}

.fields {
  display: block;
  margin-bottom: 5px;
  height: 1.75rem;
  border-radius: 5px;
  background-color: rgb(50, 50, 50);
  border: 1px solid white;
  color: white;
}

.login-btn {
  min-width: 6rem;
  min-height: 2rem;
  background-color: rgb(40, 40, 40);
  color: white;
  border: 1px solid rgb(109, 31, 255);
  border-radius: 7px;
  margin-top: 10px;
  font-size: 1rem;

  &:hover {
    background-color: rgb(60, 60, 60);
    border: 1px solid rgb(109, 31, 255);
  }
}
</style>