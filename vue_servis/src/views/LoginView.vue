<template>
  <router-link to="/" class="absolute top-0 left-0 pt-6 pl-6 text-2xl">
    <img alt="<" src="/back.png" class="w-6" />
  </router-link>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <router-link
        to="/"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-8 h-8 mr-2" src="/bar.png" alt="logo" />
        Zinjo's bar
      </router-link>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 hidden"
            id="dangerAlert"
        >
          <span class="font-medium">Danger alert!</span> Error: Login failed!
        </div>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your username</label
              >
              <input
                  v-model="username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                  v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                to="/register"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Sign up</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {ref} from "vue";
import {jwtDecode} from "jwt-decode";
import router from "@/router/index.js";
import store from "@/store/config.js";

const username = ref('');
const password = ref('');
const login = async () => {
  try {
    const response = await fetch('http://localhost:'+store.auth+'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (!response.ok) {
      // Handle registration failure
      document.getElementById('dangerAlert').classList.toggle('hidden')
      setTimeout(() => document.getElementById('dangerAlert').classList.toggle('hidden'), 5000)
      return
    }

    const data = await response.json()

    const jwtToken = data.token

    localStorage.setItem('jwtToken', jwtToken)
    const decoded = jwtDecode(jwtToken)
    if (decoded.admin) {
      window.location.href = "http://localhost:3000/admin/"
    } else {
      store.loggedIn = true;
      store.token = jwtToken
      await router.push({name: 'home'})
    }
  } catch (error) {
    document.getElementById('dangerAlert').classList.toggle('hidden')
    setTimeout(() => document.getElementById('dangerAlert').classList.toggle('hidden'), 5000)
  }
}
</script>