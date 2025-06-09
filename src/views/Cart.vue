<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
</script>
<template>
  <div class="w-full h-screen">
    <NavBar />
    <!-- 進度條 -->
    <div class="flex my-[40px] mx-[60px] sm:max-w-[720px] sm:mx-auto">
      <div class="w-full max-w-[240px] relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]">
        <div class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-400 after:content-[''] after:w-[50%] after:h-[2px] after:bg-gray-300 after:absolute after:left-[50%] after:z-[-1]">
          <span class="text-white text-center text-[12px] font-bold">1</span>
        </div>
        <span class="text-black text-[11px]">購物車</span>
      </div>
      <div class="w-full max-w-[240px] relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]">
        <div class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-300 after:content-[''] after:w-[50%] after:h-[2px] after:bg-gray-300 after:absolute after:left-[50%] after:z-[-1] before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]">
          <span class="text-white text-center text-[12px] font-bold">2</span>
        </div>
        <span class="text-black text-[11px]">填寫訂單</span>
      </div>
      <div class="w-full relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]">
        <div class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-300 before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]">
          <span class="text-white text-center text-[12px] font-bold">3</span>
        </div>
        <span class="text-black text-[11px]">訂單確認</span>
      </div>
    </div>
    <!-- 進度條 -->
  </div>
</template>