<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useCartStateStore } from '../stores/cartStateStore'
import { useAuthStore } from '../stores/authState'
import { debounce } from 'lodash'
import { Product } from '../types/types'
import router from '../router'
import Swal from 'sweetalert2'
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import ProductInfo from '../components/ProductInfo.vue'
import downArrow from '../components/svg/downArrow.vue'
import Cart from '../components/svg/Cart.vue'
import magnifier from '../components/svg/magnifier.vue'
import BackToTop from '../components/svg/BackToTop.vue'

const cartStateStore = useCartStateStore()
const authStore = useAuthStore()

const showProductInfo = ref(false)
const selectedProduct = ref<Product | null>(null)

const API_URL = import.meta.env.VITE_API_URL
const originalProducts = ref<Product[]>([]) // 原始資料
const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/products`)
    originalProducts.value = res.data
    searchAndSort()
  } catch (error) {
    console.error('取得商品失敗', error)
  }
}

const currentPage = ref(1)
const finalProducts = ref<Product[]>([])
const pageItems = 9 //1頁商品數量
const totalPages = computed(() => {
  return Math.ceil(finalProducts.value.length / pageItems)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageItems
  const end = start + pageItems
  return finalProducts.value.slice(start, end)
})

const goToPage = (page: any) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
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

const priceSortedState = ref<'low' | 'high'>('low')
const lowToHighPrice = () => {
  priceSortedState.value = 'low'
  searchAndSort()
}

const highToLowPrice = () => {
  priceSortedState.value = 'high'
  searchAndSort()
}

const searchTerm = ref('')
// 關鍵字功能
const searchAndSort = () => {
  let filtered = searchTerm.value
    ? originalProducts.value.filter((product: Product) => {
        return product.name.includes(searchTerm.value)
      })
    : [...originalProducts.value]

  finalProducts.value = filtered.sort((a, b) => {
    return priceSortedState.value === 'low'
      ? a.price - b.price
      : b.price - a.price
  })

  currentPage.value = 1
}
watch(searchTerm, debounce(searchAndSort, 300))

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

onMounted(() => {
  fetchProducts()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow relative">
      <BackToTop />
      <ProductInfo
        v-if="showProductInfo && selectedProduct"
        @close="showProductInfo = false"
        @openCart="cartStateStore.isCartOpen = true"
        :product="selectedProduct"
      />
      <div class="w-full md:grid grid-cols-4 lg:grid-cols-8">
        <div class="hidden md:block col-span-1 lg:col-span-2 pl-[50px]">
          <div class="md:mt-[20px] ml-[50px] text-[12px] text-gray-500">
            所有商品 / 所有商品
          </div>
          <div
            class="md:w-[100px] h-[1px] bg-gray-500 ml-[50px] mt-[10px]"
          ></div>
          <ul
            class="md:flex flex-col mt-[30px] pl-[50px] font-black text-[14px] gap-[10px]"
          >
            <RouterLink to="/allproducts">
              <li>所有商品</li>
            </RouterLink>
          </ul>
        </div>
        <div class="mx-[10px] my-[40px] md:col-span-3 lg:col-span-5">
          <h1
            class="text-xl font-black tracking-[2px] text-center my-5 md:text-left pl-[10px]"
          >
            所有商品
          </h1>
          <div class="w-full flex justify-end">
            <!-- 關鍵字 -->
            <div
              class="relative w-[calc(50%-15px)] mr-[20px] flex flex-col sm:w-[calc(33%-10px)] md:w-[159px]"
            >
              <div
                class="w-full h-[36px] bg-gray-100 flex items-center pl-[10px] pr-[10px] ml-[10px]"
              >
                <magnifier />
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="請輸入關鍵字"
                  class="w-full h-[36px] bg-gray-100 flex items-center text-[12px] pl-[5px] pr-[10px] focus:outline-none"
                />
              </div>
            </div>
            <!-- 排序按鈕 -->
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
                  class="w-full h-[36px] text-[12px] px-[10px] flex items-center text-gray-400 text-left hover:bg-cyan-700 hover:text-white hover:"
                >
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="grid grid-cols-2 mx-[10px] gap-x-[20px] gap-y-[60px] mt-[40px] sm:grid-cols-3"
          >
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="relative"
            >
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
                class="w-[40px] h-[40px] rounded-[50%] bg-white absolute bottom-[55px] right-[10px] cursor-pointer hover:text-cyan-700"
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
          <div class="flex justify-center gap-[15px] mt-[50px]">
            <button
              v-show="currentPage > 1"
              @click="previousPage"
              :disabled="currentPage === 1"
              class="w-[25px] h-[25px] rounded-[50%] text-[12px] hover:bg-gray-200"
            >
              <
            </button>
            <button
              @click="goToPage(page)"
              v-for="page in totalPages"
              :key="page"
              class="w-[25px] h-[25px] rounded-[50%] text-[12px] cursor-default"
              :class="
                currentPage === page
                  ? 'text-white bg-cyan-700'
                  : 'text-black hover:bg-gray-200 cursor-pointer'
              "
            >
              {{ page }}
            </button>
            <button
              v-show="currentPage < totalPages"
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="w-[25px] h-[25px] rounded-[50%] text-[12px] hover:bg-gray-200"
            >
              >
            </button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
