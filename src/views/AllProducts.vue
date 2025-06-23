<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStateStore } from '../stores/cartStateStore'
import { useAuthStore } from '../stores/authState'
import { Product } from '../types/types'
import router from '../router'
import Swal from 'sweetalert2'
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Cart from '../components/svg/Cart.vue'
import ProductInfo from '../components/ProductInfo.vue'
import downArrow from '../components/svg/downArrow.vue'

const cartStateStore = useCartStateStore()
const authStore = useAuthStore()

const showProductInfo = ref(false)
const selectedProduct = ref<Product | null>(null)

const API_URL = import.meta.env.VITE_API_URL
const products = ref<Product[]>([])
const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/products`)
    products.value = res.data
    products.value.sort((a, b) => a.price - b.price)
  } catch (error) {
    console.error('取得商品失敗', error)
  }
}

const handleClickProduct = (product: Product) => {
  if (authStore.isLoggedIn) {
    selectedProduct.value = product
    showProductInfo.value = true
  } else {
    Swal.fire({
      icon: 'error',
      title: '請先登入會員',
      color: '#e1e1e1',
      background: '#27272a',
    })
    router.push('/login')
  }
}

const options = ['價錢:由低至高', '價錢:由高至低']
const selectedOption = ref(options[0])
const isOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 1200)

const selectOption = (option: string) => {
  selectedOption.value = option
  isOpen.value = false
  if (option === '價錢:由低至高') {
    lowToHighPrice()
  } else if (option === '價錢:由高至低') {
    highToLowPrice()
  }
}

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1200
  if (isDesktop.value) {
    isOpen.value = false
  }
}

const lowToHighPrice = () => {
  products.value.sort((a, b) => {
    return a.price - b.price
  })
}

const highToLowPrice = () => {
  products.value.sort((a, b) => {
    return b.price - a.price
  })
}

onMounted(() => {
  fetchProducts()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow relative">
      <ProductInfo
        v-if="showProductInfo && selectedProduct"
        @close="showProductInfo = false"
        @openCart="cartStateStore.isCartOpen = true"
        :product="selectedProduct"
      />
      <div class="w-full md:grid grid-cols-4 lg:grid-cols-8">
        <div class="hidden md:block col-span-1 lg:col-span-2 pl-[50px]">
          <div class="md:mt-[20px] ml-[50px] text-[12px] text-gray-500">
            全部商品 / 所有商品
          </div>
          <div
            class="md:w-[100px] h-[1px] bg-gray-500 ml-[50px] mt-[10px]"
          ></div>
          <ul
            class="md:flex flex-col mt-[30px] pl-[50px] font-black text-[14px] gap-[10px]"
          >
            <li>所有商品</li>
          </ul>
        </div>
        <div class="mx-[10px] my-[40px] md:col-span-3 lg:col-span-5">
          <h1
            class="text-xl font-black tracking-[2px] text-center my-5 md:text-left pl-[10px]"
          >
            所有商品
          </h1>
          <div class="w-full flex justify-end">
            <div
              @mouseenter="isDesktop && (isOpen = true)"
              @mouseleave="isDesktop && (isOpen = false)"
              class="relative w-[calc(50%-15px)] mr-[20px] flex flex-col sm:w-[calc(33%-10px)] md:w-[159px]"
            >
              <div
                @click="!isDesktop && (isOpen = !isOpen)"
                class="w-full h-[36px] bg-gray-100 flex items-center cursor-pointer pl-[10px] pr-[10px] ml-[10px]"
              >
                <span class="w-full text-[12px] text-gray-400 text-left">{{
                  selectedOption
                }}</span>
                <downArrow />
              </div>
              <ul
                v-if="isOpen"
                class="w-full absolute top-[36px] z-[999] ml-[10px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer"
              >
                <li
                  v-for="option in options"
                  :key="option"
                  @click="selectOption(option)"
                  class="w-full h-[36px] text-[12px] px-[10px] flex items-center text-gray-400 text-left hover:bg-black hover:text-white hover:"
                >
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="grid grid-cols-2 mx-[10px] gap-x-[10px] gap-y-[60px] mt-[40px] sm:grid-cols-3"
          >
            <div v-for="product in products" :key="product.id" class="relative">
              <a class="cursor-default pointer-events-none" href="#">
                <div class="aspect-square">
                  <img
                    :src="product.image"
                    alt="商品圖片"
                    class="object-cover w-full h-full"
                  />
                </div>
              </a>
              <div
                @click="handleClickProduct(product)"
                class="w-[40px] h-[40px] rounded-[50%] bg-white absolute bottom-[55px] right-[10px] cursor-pointer hover:bg-gray-200"
              >
                <Cart />
              </div>
              <div class="mt-[10px]">
                <div class="text-xs text-center">{{ product.name }}</div>
                <div
                  class="text-xs text-center pt-[5px] font-black"
                  style="-webkit-text-stroke: 0.5px black"
                >
                  NT${{ product.price }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
