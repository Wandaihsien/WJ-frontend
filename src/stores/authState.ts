import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/useCartStore'

export const checkAuthState = defineStore('authStore', () => {
  const cartStore = useCartStore()
  const token = ref<string | null>(localStorage.getItem('token'))
  const userEmail = ref<string | null>(null)
  const userId = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    if (token) {
      return !!token.value
    }
  })

  const setUser = (email: string, newToken: string, newUserId: string) => {
    userId.value = newUserId
    userEmail.value = email
    token.value = newToken
    localStorage.setItem('userId', newUserId)
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', email)
  }

  const logout = () => {
    userEmail.value = null
    userId.value = null
    token.value = null
    cartStore.clearCart()
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
  }

  return {
    token,
    isLoggedIn,
    userEmail,
    setUser,
    logout,
  }
})
