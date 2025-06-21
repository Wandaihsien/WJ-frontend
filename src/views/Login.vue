<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authState'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

const email = ref('')
const password = ref('')
const authState = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL

const submit = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email.value,
      password: password.value,
    })

    const token = response.data.token
    const userId = response.data.user.id
    if (token) {
      authState.setUser(email.value, token, userId)
      router.push('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: '請稍後再試',
        color: '#e1e1e1',
        background: '#27272a',
      })
    }
  } catch (error: unknown) {
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: '請檢查信箱或密碼是否正確',
      color: '#e1e1e1',
      background: '#27272a',
    })
  }
}
</script>
<template>
  <div class="w-full min-h-screen">
    <NavBar />
    <main
      class="w-full pl-[30px] pr-[30px] pt-[20px] pb-[20px] sm:w-[420px] flex justify-center flex-col mx-auto mt-[20px]"
    >
      <p class="text-[32px] font-black">登入</p>
      <form @submit.prevent="submit" class="w-full mt-[40px]">
        <div class="w-full flex flex-col">
          <label for="username" class="hidden text-red-500 text-[12px]"
            >電郵或手機號碼</label
          >
          <input
            v-model="email"
            id="username"
            type="text"
            placeholder="電郵或手機號碼"
            required
            class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]"
          />
          <!-- <div class="hidden text-red-500 text-[12px]">電郵或手機號碼是必須的</div> -->
        </div>
        <div class="w-full flex flex-col mt-[30px]">
          <label for="password" class="hidden text-red-500 text-[12px]"
            >密碼</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="(至少6個字元)"
            required
            class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]"
          />
          <!-- <div class="hidden text-red-500 text-[12px]">密碼是必須的</div> -->
        </div>
        <button
          type="submit"
          class="w-full h-[46px] font-bold mt-[60px] bg-black text-white rounded-[0.25rem]"
        >
          登入
        </button>
      </form>
      <p class="text-[30px] font-semibold mt-[70px]">還不是會員嗎?</p>
      <RouterLink to="/signup">
        <button
          class="w-full h-[46px] border border-black rounded-[0.25rem] mt-[20px] font-bold"
        >
          註冊會員
        </button>
      </RouterLink>
    </main>
    <Footer />
  </div>
</template>
