<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import { useCartStateStore } from '../stores/cartStateStore'
import router from '../router'
import TrashCan from './svg/TrashCan.vue'

const cartUIStore = useCartStateStore()
const isMenuOpen = ref(false)
const closeAllBars = () => {
  isMenuOpen.value = false
  cartUIStore.isCartOpen = false
}

const slideChanged = ref('slide-left')


const updateTransition = () => {
  slideChanged.value = window.innerWidth >= 1200 ? 'slide-right' : 'slide-left'
}


// 固定背景
let scrollTop = 0
watch(
  [() => isMenuOpen.value, () => cartUIStore.isCartOpen],
  ([menuOpen, cartOpen]) => {
    const isAnyOpen = menuOpen || cartOpen

    if (isAnyOpen) {
      scrollTop = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollTop}px`
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollTop)
    }
  }
)

// 檢查會員是否登入
const isLoggedIn = () => {
  const token = localStorage.getItem('token')
  if(token) {
    return true
  }
}

const handleUserClick = () => {
  if(isLoggedIn()) {
    router.push('/user')
  }else {
    router.push('/login')
  }
}

const cartStore = useCartStore()

onMounted(() => {
  updateTransition()
  window.addEventListener('resize', updateTransition)
  cartStore.loadCart()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTransition)
})
</script>

<template>
  <div class="shadow-[0_4px_6px_rgba(0,0,0,0.05)] sticky top-0 z-10">
    <div
      v-if="isMenuOpen || cartUIStore.isCartOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-[999]
      lg:bg-opacity-0"
      @click="closeAllBars"
    ></div>
    <Transition name="slide-left">
      <div v-if="isMenuOpen" class="w-[30vw] h-screen z-[1000] bg-black absolute will-change-transform">
        <ul class="text-white text-[2vw] flex flex-col items-center mt-[10px] gap-[20px]">
          <li>
            <a href="">首頁</a>
          </li>
          <li>
            <RouterLink to="/">所有商品</RouterLink>
          </li>
        </ul>
        <div class="relative text-white text-[3vw] text-center mt-[20px] font-black before:content-[''] before:block before:w-[40%] before:h-px before:bg-white before:mx-auto before:mt-[10px] before:mb-[10px]">分類</div>
        <ul class="text-white text-[2vw] flex flex-col items-center mt-[10px] gap-[20px]">
          <li>
            <a href="">手鍊</a>
          </li>
          <li>
            <a href="">項鍊</a>
          </li>
          <li>
            <a href="">戒指</a>
          </li>
          <li>
            <a href="">耳環</a>
          </li>
        </ul>
        <div class="relative text-white text-[3vw] text-center font-black mt-[20px] before:content-[''] before:block before:w-[40%] before:h-px before:bg-white before:mx-auto before:mt-[10px] before:mb-[20px]">帳戶</div>
        <ul class="text-white text-[2vw] flex flex-col items-center mt-[10px] gap-[20px]">
          <li>
            <RouterLink to="/login">會員登入</RouterLink>
          </li>
          <li>
            <RouterLink to="/signup">新用戶註冊</RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
    <Transition :name="slideChanged" >
      <div v-if="cartUIStore.isCartOpen" class="w-[30vw] h-screen bg-white absolute overflow-y-auto z-[1000] will-change-transform
      lg:right-[5vw] lg:top-[18vh] lg:max-w-[300px] lg:h-auto lg:min-h-[136px] lg:max-h-[80vh]">
        <div v-for="item in cartStore.cartItems":key="item.id" class="w-full p-[15px] flex gap-[15px] relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-200 after:absolute after:bottom-0 after:left-0">
          <div class="w-[20%] min-w-[33px] max-w-[70px] aspect-square">
            <img :src="item.product.image" alt="商品圖片" class="object-cover">
          </div>
          <div class="w-[60%] min-w-[115px] flex flex-col justify-between">
            <div class="text-[1.3vw] text-gray-400
            lg:text-[0.8vw]">{{ item.product.name }}</div>
            <div class="text-[1.5vw] flex gap-[5px]
            lg:text-[0.8vw]">
              {{ item.quantity }}
              <span>x</span>
              <span>NT${{ item.product.price }}</span>
            </div>
          </div>
          <div class="w-[10%] absolute right-[10px] bottom-[20px]">
            <TrashCan @click="cartStore.removeFromCart(item.product.id)" class="size-[1.5vw] lg:size-[1vw] cursor-pointer"/>
          </div>
        </div>
        <div v-if="cartStore.cartItems.length === 0" class="w-full h-screen flex justify-center items-center lg:h-[135px]">
            <span class="text-[1.5vw] lg:text-[12px]">購物車是空的</span>
        </div>
        <RouterLink to="/cart">
          <div v-if="cartStore.cartItems.length > 0" class="w-full mb-[10px] flex justify-center items-center
          lg:mb-0 lg:relative">
            <button class="w-[calc(100%-20px)] pl-[10px] pr-[10px] h-[36px] bg-black text-white text-[1.5vw] font-bold
            lg:w-full lg:text-[1vw]">訂單結帳
            </button>
          </div>
        </RouterLink>
      </div>
    </Transition>
    <div class="w-full h-[34.56px] bg-red-800">
      <a href="#" class="h-full flex items-center justify-center">
        <p class="text-white text-xs inline-block">全館免運</p>
      </a>
    </div>
    <nav class="w-full">
      <div class="w-full h-[60px] flex bg-white">
        <div class="w-1/2 flex items-center">
          <div class="ml-[20px]">
            <RouterLink to="/">
              <img src="/src/img/WJ.jpg" class="w-[30px] h-[30px] cursor-pointer" alt="logo">
            </RouterLink>
          </div>
        </div>
        <div class="w-1/2 flex items-center justify-end">
          <ul class="flex">
            <li @click="handleUserClick" class="pl-[10px] pr-[10px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-[60px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </li>
            <li @click="cartUIStore.isCartOpen = !cartUIStore.isCartOpen" class="pl-[10px] pr-[10px] relative z-10 md:pr-[25px]">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-[60px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <div class="absolute top-[26px] left-[16px]">
                  <span class="w-[12px] text-[11px] text-center flex justify-center items-center">{{ cartStore.cartItems.length }}</span>
                </div>
              </a>
            </li>
            <li @click="isMenuOpen = !isMenuOpen" :class="isMenuOpen ? 'bg-gray-100' : 'bg-transparent'" class="pl-[20px] pr-[20px] lg:hidden">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 h-[60px]">
                  <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="hidden lg:flex w-full h-[47px] bg-black items-center justify-center">
        <ul class="flex text-white text-[12px] gap-[30px]">
          <!-- <li>
            <RouterLink to="/AllProducts">首頁</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/">所有商品</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style scoped>
/* 左滑入 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-30vw);
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}

/* 右滑入 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(30vw);
}
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}
</style>