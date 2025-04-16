<script setup>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import Cart from '../components/svg/Cart.vue';
import ProductInfo from '../components/ProductInfo.vue';

const showProductInfo = ref(false);
const showProductInfoHandler = () => {
  showProductInfo.value = !showProductInfo.value;
};
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow relative">
      <ProductInfo v-if="showProductInfo" @close="showProductInfo = false"/>
      <div class="w-full md:grid grid-cols-4 lg:grid-cols-8">
        <div class="hidden md:block col-span-1 lg:col-span-2 pl-[50px]">
          <div class="md:mt-[20px] ml-[50px] text-[12px] text-gray-500">全部商品 / 所有商品</div>
          <div class="md:w-[100px] h-[1px] bg-gray-500 ml-[50px] mt-[10px]"></div>
          <ul class="md:flex flex-col mt-[30px] pl-[50px] font-black text-[14px] gap-[10px]">
            <li>所有商品</li>
            <li>手鍊</li>
            <li>項鍊</li>
            <li>戒指</li>
            <li>耳環</li>
          </ul>
        </div>
        <div class="mx-[10px] my-[40px] md:col-span-3 lg:col-span-5">
          <h1 class="text-xl font-black tracking-[2px] text-center my-5 md:text-left pl-[10px]">所有商品</h1>
          <div class="flex sm:justify-end">
            <button class="w-[calc(50%-10px)] h-[36px] bg-gray-100 flex items-center pl-[10px] pr-[10px] ml-[10px] sm:w-[calc(33%-6px)] md:w-[159px] mr-[10px]">
              <span class="w-full text-[12px] text-gray-400 text-left">上架時間:由新到舊</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3 text-gray-400">
                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-2 mx-[10px] gap-x-[10px] gap-y-[60px] mt-[40px] sm:grid-cols-3">
            <div class="relative">
              <a href="#">
                <div class="aspect-square">
                  <img src="/src/img/barcelet.jpg" alt="#" class="object-cover w-full h-full">
                </div>
              </a>
              <div class="w-[40px] h-[40px] rounded-[50%] bg-white absolute bottom-[55px] right-[10px] cursor-pointer">
                <Cart @click="showProductInfo = !showProductInfo"/>
              </div>
              <div class="mt-[10px]">
                <div class="text-xs text-center">8mm 山度士手鍊</div>
                <div class="text-xs text-center pt-[5px] font-black" style=" -webkit-text-stroke: 0.5px black">NT$7,980</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>