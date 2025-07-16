<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import { useCartStateStore } from '../stores/cartStateStore'
import { useAuthStore } from '../stores/authState'
import router from '../router'
import TrashCan from './svg/TrashCan.vue'
import TripleLine from './svg/TripleLine.vue'
import UserIcon from './svg/UserIcon.vue'
import Cart2 from './svg/Cart2.vue'

const cartStateStore = useCartStateStore()
const isMenuOpen = ref(false)
const closeAllBars = () => {
  isMenuOpen.value = false
  cartStateStore.isCartOpen = false
}

const slideChanged = ref('slide-left')

const updateTransition = () => {
  slideChanged.value = window.innerWidth >= 1200 ? 'slide-right' : 'slide-left'
}

// 固定背景
let scrollTop = 0
watch(
  [() => isMenuOpen.value, () => cartStateStore.isCartOpen],
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

const authStore = useAuthStore()

const handleUserClick = () => {
  if (authStore.isLoggedIn) {
    router.push('/user')
  } else {
    router.push('/login')
  }
}

const handleCheckout = () => {
  cartStateStore.closeCart()
  router.push('/cart')
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
      v-if="isMenuOpen || cartStateStore.isCartOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-[999] lg:bg-opacity-0"
      @click="closeAllBars"
    ></div>
    <Transition name="slide-left">
      <div
        v-if="isMenuOpen"
        class="w-[300px] h-screen z-[1000] bg-black absolute will-change-transform sm:w-[30vw]"
      >
        <ul
          class="text-white text-[18px] flex flex-col items-center mt-[10px] gap-[20px] sm:text-[2vw]"
        >
          <li>
            <a href="">首頁</a>
          </li>
          <li>
            <RouterLink to="/" class="cursor-pointer">所有商品</RouterLink>
          </li>
        </ul>
        <!-- <div
          class="relative text-white text-[20px] text-center mt-[20px] font-black before:content-[''] before:block before:w-[40%] before:h-px before:bg-white before:mx-auto before:mt-[10px] before:mb-[10px] sm:text-[3vw]"
        >
          分類
        </div>
        <ul
          class="text-white text-[18px] flex flex-col items-center mt-[10px] gap-[20px] sm:text-[2vw]"
        >
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
        </ul> -->
        <div
          v-if="!authStore.isLoggedIn"
          class="relative text-white text-[3vw] text-center font-black mt-[20px] before:content-[''] before:block before:w-[40%] before:h-px before:bg-white before:mx-auto before:mt-[10px] before:mb-[20px]"
        >
          帳戶
        </div>
        <ul
          v-if="!authStore.isLoggedIn"
          class="text-white text-[2vw] flex flex-col items-center mt-[10px] gap-[20px]"
        >
          <li>
            <RouterLink to="/login">會員登入</RouterLink>
          </li>
          <li>
            <RouterLink to="/signup">新用戶註冊</RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
    <Transition :name="slideChanged">
      <div
        v-if="cartStateStore.isCartOpen"
        class="w-[300px] h-screen bg-white absolute overflow-y-auto z-[1000] sm:w-[35vw] lg:right-[5vw] lg:top-[18vh] lg:max-w-[300px] lg:h-auto lg:min-h-[136px] lg:max-h-[80vh]"
      >
        <div
          v-for="item in cartStore.cartItems"
          :key="item.id"
          class="w-full p-[15px] flex gap-[15px] relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-200 after:absolute after:bottom-0 after:left-0"
        >
          <div class="w-[30%] min-w-[33px] max-w-[70px] aspect-square">
            <img
              :src="item.product.image"
              alt="商品圖片"
              class="object-cover"
            />
          </div>
          <div class="w-[60%] min-w-[115px] flex flex-col justify-between">
            <div
              class="text-[16px] text-gray-400 sm:text-[1.3vw] lg:text-[0.8vw]"
            >
              {{ item.product.name }}
            </div>
            <div
              class="text-[16px] flex gap-[5px] sm:text-[1.5vw] lg:text-[0.8vw]"
            >
              {{ item.quantity }}
              <span>x</span>
              <span>NT${{ item.product.price }}</span>
            </div>
          </div>
          <div class="w-[10%] absolute right-[10px] bottom-[20px]">
            <TrashCan
              @click="cartStore.removeFromCart(item.product.id)"
              class="size-[16px] sm:size-[1.5vw] lg:size-[1vw] cursor-pointer"
            />
          </div>
        </div>
        <div
          v-if="cartStore.cartItems.length === 0"
          class="w-full h-screen flex justify-center items-center lg:h-[135px]"
        >
          <span class="text-[14px] sm:text-[1.5vw] lg:text-[12px]"
            >購物車是空的</span
          >
        </div>
        <RouterLink to="/cart">
          <div
            v-if="cartStore.cartItems.length > 0"
            class="w-full mb-[10px] flex justify-center items-center lg:mb-0 lg:relative"
          >
            <button
              @click="handleCheckout"
              class="w-[calc(100%-20px)] pl-[10px] pr-[10px] h-[36px] bg-cyan-700 text-white text-[16px] font-bold sm:text-[1.5vw] lg:w-full lg:text-[1vw]"
            >
              訂單結帳
            </button>
          </div>
        </RouterLink>
      </div>
    </Transition>
    <div class="w-full h-[34.56px] bg-cyan-700">
      <div class="h-full flex items-center justify-center">
        <p class="text-white text-xs inline-block">全館免運</p>
      </div>
    </div>
    <nav class="w-full">
      <div class="w-full h-[60px] flex bg-white">
        <div class="w-1/2 flex items-center">
          <div class="ml-[20px]">
            <RouterLink to="/">
              <img
                src="/src/img/WJ.jpg"
                class="w-[30px] h-[30px] cursor-pointer"
                alt="logo"
              />
            </RouterLink>
          </div>
        </div>
        <div class="w-1/2 flex items-center justify-end">
          <ul class="flex">
            <li
              @click="handleUserClick"
              class="pl-[10px] pr-[10px] cursor-pointer"
            >
              <UserIcon />
            </li>
            <li
              @click="cartStateStore.isCartOpen = !cartStateStore.isCartOpen"
              class="pl-[10px] pr-[10px] cursor-pointer relative z-10 md:pr-[25px]"
            >
              <Cart2 />
              <div class="absolute top-[26px] left-[16px]">
                <span
                  class="w-[12px] text-[11px] text-center flex justify-center items-center"
                  >{{ cartStore.cartItems.length }}</span
                >
              </div>
            </li>
            <li
              @click="isMenuOpen = !isMenuOpen"
              :class="isMenuOpen ? 'bg-gray-100' : 'bg-transparent'"
              class="pl-[20px] pr-[20px] lg:hidden"
            >
              <TripleLine />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="hidden lg:flex w-full h-[47px] bg-black items-center justify-center"
      >
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
