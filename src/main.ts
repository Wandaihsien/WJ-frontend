import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'
import GoogleLoginPlugin from 'vue3-google-login'
import Swal from 'sweetalert2'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(GoogleLoginPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})
app.mount('#app')

import { useAuthStore } from '../src/stores/authState'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token 過期，後端回傳 401
      const authState = useAuthStore()

      // 清除 token 和購物車
      authState.logout()

      Swal.fire({
        icon: 'error',
        title: '登入已過期，請重新登入',
        color: '#e1e1e1',
        background: '#27272a',
      }).then(() => {
        router.push('/login')
      })
    }
    return Promise.reject(error)
  }
)
