<script setup>
import Cross from './svg/Cross.vue';
import Plus from './svg/plus.vue';
import Minus from './svg/Minus.vue';

</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-50 z-[996]"></div>

  <div class="w-[calc(100%-40px)] h-[480px] ml-[20px] mr-[20px] mt-[50px] overflow-y-auto fixed top-[150px] flex flex-col bg-white z-[997] sm:max-w-[640px] sm:max-h-[388px] sm:flex-row sm:mx-auto 
  sm:left-1/2 sm:translate-x-[-50%]">
    <div class="fixed right-[20px] top-[200px] w-[36px] h-[36px] bg-black text-white flex justify-center items-center sm:top-[0] sm:right-[0]">
      <Cross @click="$emit('close')"
      class="cursor-pointer"/>
    </div>
    <div class="w-full">
      <img src="/src/img/barcelet.jpg" alt="" class="object-cover w-full h-[300px]">
    </div>
    <div class="w-full">
      <div class="w-full px-[20px] mt-[20px]">
        <h2 class="font-bold text-[22px]">雙排鑲嵌永恆耳環</h2>
        <p class="font-bold text-[17px] mt-[20px]">NT1,580</p>
        <div class="mt-[20px] flex justify-center items-center">
          <div class="w-[34px] h-[34px] border-[2px] border-black rounded-[50%] flex justify-center items-center"><Minus class="cursor-pointer"/></div>
          <p class="mx-[40px]">1</p>
          <div class="w-[34px] h-[34px] border-[2px] border-black rounded-[50%] flex justify-center items-center"><Plus class="cursor-pointer"/></div>
        </div>
      </div>
      <div class="w-full mt-[40px] mb-[10px]">
        <button class="w-[50%] h-[45px] bg-black text-white text-[14px] font-bold">加入購物車</button>
        <button class="w-[50%] h-[45px] bg-black text-white text-[14px] font-bold">立即購買</button>
      </div>
    </div>
  </div>
</template>