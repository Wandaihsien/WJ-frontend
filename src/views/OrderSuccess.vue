<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
</script>
<template>
  <div class="w-full h-screen">
    <NavBar />
    <div
      class="min-h-screen bg-white flex items-center justify-center px-4 py-5"
    >
      <div class="w-full max-w-[600px] border border-gray-300 p-8 text-center">
        <div class="text-green-500 text-6xl mb-4">✓</div>
        <div class="text-gray-800 text-2xl font-semibold mb-2">
          訂單建立成功
        </div>
        <p class="text-sm text-gray-600 mb-1">
          訂單編號：<span class="font-medium">20250611001</span>
        </p>
        <p class="text-sm text-gray-600 mb-6">
          感謝您的訂購，我們將盡快為您出貨。
        </p>
        <RouterLink
          to="/member/orders"
          class="block w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition sm:max-w-[314px] md:max-w-[424px] lg:max-w-[524px] mx-auto"
        >
          查看訂單
        </RouterLink>
      </div>
    </div>
  </div>
</template>
