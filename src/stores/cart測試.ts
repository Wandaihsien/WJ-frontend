import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Product, CartItem } from '../types/types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  const loadCart = () => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart)
    }
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const addToCart = (product: Product, quantity: number) => {
    const existingItems = cartItems.value.find((item) => {
      return item.id === product.id
    })
    if (existingItems) {
      existingItems.quantity += quantity
    } else {
      cartItems.value.push({ ...product, quantity })
    }
    saveCart()
  }

  const removeFromCart = (product: Product) => {
    cartItems.value = cartItems.value.filter((item) => {
      return item.id !== product.id
    })
    saveCart()
  }

  return {
    loadCart,
    cartItems,
    addToCart,
    removeFromCart,
  }
})
