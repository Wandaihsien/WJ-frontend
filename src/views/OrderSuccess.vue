<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const orderNo = route.query.orderNo
</script>
<template>
  <div class="w-full h-screen min-h-[300px]">
    <NavBar />
    <!-- 進度條 -->
    <div class="flex my-[40px] mx-[60px] sm:max-w-[720px] sm:mx-auto">
      <div
        class="w-full max-w-[240px] relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]"
      >
        <div
          class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-400 after:content-[''] after:w-[50%] after:h-[2px] after:bg-gray-300 after:absolute after:left-[50%] after:z-[-1]"
        >
          <span class="text-white text-center text-[12px] font-bold">1</span>
        </div>
        <span class="text-black text-[11px]">購物車</span>
      </div>
      <div
        class="w-full max-w-[240px] relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]"
      >
        <div
          class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-400 after:content-[''] after:w-[50%] after:h-[2px] after:bg-gray-300 after:absolute after:left-[50%] after:z-[-1] before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]"
        >
          <span class="text-white text-center text-[12px] font-bold">2</span>
        </div>
        <span class="text-black text-[11px]">填寫資料</span>
      </div>
      <div
        class="w-full relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]"
      >
        <div
          class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-400 before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]"
        >
          <span class="text-white text-center text-[12px] font-bold">3</span>
        </div>
        <span class="text-black text-[11px]">訂單確認</span>
      </div>
    </div>
    <div class="w-full flex items-center justify-center mt-[100px] px-4 py-5">
      <div
        class="w-full max-w-[600px] border border-gray-300 p-8 text-center sm:mx-auto"
      >
        <div class="text-green-500 text-6xl mb-4">✓</div>
        <div class="text-gray-800 text-2xl font-semibold mb-2">
          訂單建立成功
        </div>
        <p class="text-sm text-gray-600 mb-1">
          訂單編號：<span class="font-medium">{{ orderNo }}</span>
        </p>
        <p class="text-sm text-gray-600 mb-6">
          感謝您的訂購，我們將盡快為您出貨。
        </p>
        <RouterLink
          to="/user"
          class="block w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition sm:max-w-[314px] md:max-w-[424px] lg:max-w-[524px] mx-auto"
        >
          查看訂單
        </RouterLink>
      </div>
    </div>
  </div>
</template>
