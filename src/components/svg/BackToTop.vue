<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const scrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' })
}

const scrollY = ref(0)
const updateScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="scrollY > 90"
      class="flex justify-center items-center group fixed bottom-[100px] right-[30px] z-[1000]"
    >
      <svg
        @click="scrollToTop"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 44 44"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[44px] h-[44px] group-hover:stroke-cyan-700 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M22 30V14M17 19l5-5 5 5"
        />
        <circle cx="22" cy="22" r="20" />
      </svg>
    </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
