<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
</script>
<template>
  <div class="w-full h-screen">
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
    <div class="flex items-center justify-center mt-[100px] px-4 py-12">
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
