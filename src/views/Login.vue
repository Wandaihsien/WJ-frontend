<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authState'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'
import googleLogin from '../components/googleLogin.vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/svg/BackToTop.vue'

const email = ref('')
const password = ref('')
const authState = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL

const clearForm = () => {
  email.value = ''
  password.value = ''
}
const submit = async () => {
  const errors: {
    general?: string
    email?: string
    password?: string
  } = {}

  if (email.value.trim() === '' && password.value.trim() === '') {
    errors.general = '請輸入帳號及密碼'
  } else {
    if (email.value.trim() === '') {
      errors.email = '帳號不能為空'
    }

    if (password.value.trim() === '') {
      errors.password = '密碼不能為空'
    }
  }

  if (Object.keys(errors).length > 0) {
    clearForm()
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: Object.values(errors).join('\n'),
      color: '#e1e1e1',
      background: '#27272a',
    })
    return
  }
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email.value,
      password: password.value,
    })

    const token = response.data.token
    const userId = response.data.user.id
    if (token) {
      authState.setUser(email.value, token, userId)
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        color: '#e1e1e1',
        background: '#27272a',
      })
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
      class="w-full relative pl-[30px] pr-[30px] pt-[20px] pb-[20px] sm:w-[420px] flex justify-center flex-col mx-auto mt-[20px]"
    >
      <BackToTop />
      <p class="text-[32px] font-black">登入</p>
      <form @submit.prevent="submit" class="w-full mt-[40px]">
        <div class="w-full flex flex-col">
          <label for="username" class="hidden text-red-500 text-[12px]"
            >電子信箱</label
          >
          <input
            v-model="email"
            id="username"
            type="text"
            placeholder="電子信箱"
            class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]"
          />
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
            class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]"
          />
        </div>
        <button
          type="submit"
          class="w-full h-[46px] font-bold mt-[60px] bg-black text-white rounded-[0.25rem] hover:bg-gray-500"
        >
          登入
        </button>
      </form>
      <p class="text-[30px] font-semibold mt-[70px]">還不是會員嗎?</p>
      <RouterLink to="/signup">
        <button
          class="w-full h-[46px] border border-black rounded-[0.25rem] mt-[20px] font-bold hover:bg-gray-100"
        >
          註冊會員
        </button>
      </RouterLink>
      <googleLogin class="mt-[20px]" />
    </main>
    <Footer />
  </div>
</template>
