import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/useCartStore'

export const checkAuthState = defineStore('authStore', () => {
  const cartStore = useCartStore()
  const token = ref<string | null>(localStorage.getItem('token'))
  const userEmail = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    if (token) {
      return !!token.value
    }
  })

  const setUser = (email: string, newToken: string) => {
    userEmail.value = email
    token.value = newToken
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', email)
  }

  const logout = () => {
    userEmail.value = null
    token.value = null
    cartStore.clearCart()
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  return {
    token,
    isLoggedIn,
    userEmail,
    setUser,
    logout,
  }
})
