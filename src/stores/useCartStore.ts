import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { debounce } from 'lodash'
import axios from 'axios'
import { Product, CartItem } from '../types/types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])
  const getToken = () => {
    return localStorage.getItem('token')
  }

  const loadCart = async () => {
    const token = getToken()
    if (!token) {
      return
    }
    try {
      const res = await axios.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      cartItems.value = res.data.items
    } catch (err) {
      console.error('讀取商品錯誤', err)
    }
  }

  const addToCart = async (product: Product, quantity: number) => {
    const token = getToken()
    try {
      await axios.post(
        '/api/cart',
        {
          productId: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      await loadCart()
    } catch (err) {
      console.error('加入購物車失敗', err)
    }
  }

  const removeFromCart = async (productId: number) => {
    console.log(123)
    const token = getToken()
    try {
      await axios.delete(`/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await loadCart()
    } catch (err) {
      console.error('刪除購物車項目失敗', err)
    }
  }

  const updateCartQuantity = debounce(
    async (productId: number, newQty: number) => {
      const token = getToken()
      try {
        await axios.patch(
          `/api/cart`,
          {
            productId: productId,
            quantity: newQty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        await loadCart()
      } catch (error) {
        console.log(error)
      }
    },

    200
  )

  // 傳給登出頁清空購物車
  const clearCart = () => {
    cartItems.value = []
  }

  const cartPriceTotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)
  })

  return {
    loadCart,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    cartPriceTotal,
  }
})
