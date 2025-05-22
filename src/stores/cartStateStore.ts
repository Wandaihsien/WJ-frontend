import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStateStore = defineStore('cartState', () => {
  const isCartOpen =  ref(false)

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }
  
  return {
    isCartOpen,
    openCart,
    closeCart
  }
})