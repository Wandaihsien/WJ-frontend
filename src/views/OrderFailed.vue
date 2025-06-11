<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
</script>
<template>
  <div class="w-full h-screen">
    <NavBar />
    <div
      class="min-h-screen bg-white flex items-center justify-center px-4 py-12"
    >
      <div class="w-full max-w-[600px] border border-gray-300 p-8 text-center">
        <div class="text-red-500 text-6xl mb-4">✘</div>
        <div class="text-gray-800 text-2xl font-semibold mb-2">付款失敗</div>
        <p class="text-sm text-gray-600 mb-6">
          付款未成功，請重新確認付款資訊後再試一次。
        </p>
        <RouterLink
          to="/cart"
          class="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition sm:max-w-[314px] md:max-w-[424px] lg:max-w-[524px] mx-auto"
        >
          返回購物車
        </RouterLink>
      </div>
    </div>
  </div>
</template>
