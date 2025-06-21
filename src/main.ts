import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'
import Swal from 'sweetalert2'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

import { useAuthStore } from '../src/stores/authState'
// 1小時候會登出
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token 過期，後端回傳 401
      const authState = useAuthStore()

      // 清除 token 和購物車
      authState.logout()

      router.push('/login')
      Swal.fire({
        icon: 'error',
        title: '登入已過期，請重新登入',
        color: '#e1e1e1',
        background: '#27272a',
      })
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
