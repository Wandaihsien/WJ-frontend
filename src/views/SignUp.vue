<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Swal from 'sweetalert2'


const router = useRouter()
const email = ref('')
const password = ref('')

const API_URL = import.meta.env.VITE_API_URL

const clearForm = () => {
  email.value = ''
  password.value = ''
}


const signup = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const errors: {
    general?: string
    email?: string
    password?: string
  } = {}

  if(email.value.trim() === '' || password.value.trim() === '') {
    errors.general = '請填寫完整資料'
  }else {
    if(!emailRegex.test(email.value)) {
      errors.email = '電子郵件格式錯誤'
    }
    if(password.value.trim().length < 6) {
      errors.password = '密碼至少需要6個字元'
    }
  }
  if(Object.keys(errors).length > 0) {
    clearForm()
    Swal.fire({
      icon:'error',
      title:'錯誤',
      text:Object.values(errors).join('\n'),
      color: '#e1e1e1',
      background: '#27272a',
    })
    return
  }
 
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`,
    {
      email : email.value,
      password : password.value,
    },
    {
      headers: {
        'content-Type':'application/json'
      }
    })

    if(response.status === 200 || response.status === 201) {
      Swal.fire({
        icon:'success',
        title:'註冊成功',
        color: '#e1e1e1',
        background: '#27272a',
      })
      router.push('/login')
    }
  }catch(error : unknown) {
    const axiosError = error as AxiosError<any>

    if(axiosError.response) {
      const status = axiosError.response.status
      const message = axiosError.response.data.message

      Swal.fire({
        icon:'error',
        title:'註冊失敗',
        text:status === 409 ? message || '此email已註冊過': message || '發生未知錯誤，請稍後再試',
        color: '#e1e1e1',
        background: '#27272a',
      })
    } else {
      Swal.fire({
        icon:'error',
        title:'註冊失敗',
        text:'無法連接到伺服器，請檢查網路連線',
        color: '#e1e1e1',
        background: '#27272a',
      })
    }

    clearForm()
  }
}

</script>
<template>
  <div class="w-full min-h-screen">
    <NavBar />
    <main class="w-full pl-[30px] pr-[30px] pt-[20px] pb-[20px] sm:w-[420px] flex justify-center flex-col mx-auto mt-[20px]">
      <p class="text-[32px] font-black">註冊會員</p>
      <form action="" class="w-full mt-[40px]">
        <div class="w-full flex flex-col">
          <label for="email" class="hidden text-red-500 text-[12px]">電郵</label>
          <input v-model ="email" id="email" type="email" placeholder="電郵" autocomplete="email" required class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]">
          <!-- <div class="text-red-500 text-[12px]">電郵是必須的</div> -->
        </div>
        <div class="w-full flex flex-col mt-[30px]">
          <label for="password" class="hidden text-red-500 text-[12px]">密碼</label>
          <input v-model ="password" id="password" type="password" autocomplete="new-password" placeholder="密碼(至少6個字元)" required class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]">
          <!-- <div class="text-red-500 text-[12px]">密碼是必須的</div> -->
        </div>
        <button @click.prevent="signup" class="w-full h-[46px] font-bold mt-[60px] bg-black text-white rounded-[0.25rem]">註冊</button>
      </form>
      <p class="text-[30px] font-semibold mt-[70px]">已經有帳號?</p>
      <RouterLink to="/login">
        <button class="w-full h-[46px] border border-black rounded-[0.25rem] mt-[20px] font-bold">登入</button>
      </RouterLink>
    </main>
    <Footer />
  </div>
</template>