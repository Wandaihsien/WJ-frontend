import { defineStore } from 'pinia';
import { ref,computed } from 'vue'

export const checkAuthState = defineStore('authStore',()=> {

  const token = ref< string | null>(localStorage.getItem('token'))
  const userEmail = ref< string | null>(null)

  const isLoggedIn = computed(() => {
    if(token) {
      return true
    }{
      return false
    }
  })

  const setUser = (email:string, newToken:string) => {
    userEmail.value = email
    token.value = newToken
    localStorage.setItem('token',newToken)
    localStorage.setItem('email', email)
  }

  const LogOut = () => {
    userEmail.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  return {
    token,
    isLoggedIn,
    userEmail,
    setUser,
    LogOut
  }
})