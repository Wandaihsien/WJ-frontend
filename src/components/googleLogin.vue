<script setup lang="ts">
import router from '../router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/authState'
import { GoogleLoginResponse } from '../types/types'

const authStore = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL
const handleGoogleLogin = async (response: GoogleLoginResponse) => {
  console.log('Google 登入 response:', response)
  const googleToken = response.credential
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/googleLogin`, {
      token: googleToken,
    })
    const token = data.token
    const email = data.user.email
    const userId = data.user.id
    if (data.token) {
      authStore.setUser(email, token, userId)
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
        title: '登入發生錯誤',
        color: '#e1e1e1',
        background: '#27272a',
      })
    }
  } catch (error) {
    console.error('登入錯誤', error)
    Swal.fire({
      icon: 'error',
      title: '登入發生錯誤',
      color: '#e1e1e1',
      background: '#27272a',
    })
  }
}
</script>
<template>
  <GoogleLogin :callback="handleGoogleLogin" />
</template>
