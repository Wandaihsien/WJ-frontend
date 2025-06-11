<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Plus from '../components/svg/Plus.vue'
import Minus from '../components/svg/Minus.vue'
import Cross from '../components/svg/Cross.vue'
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
        <span class="text-black text-[11px]">填寫資料</span>
      </div>
      <div class="w-full relative flex flex-col justify-center items-center gap-[10px] sm:max-w-[240px]">
        <div class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-300 before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]">
          <span class="text-white text-center text-[12px] font-bold">3</span>
        </div>
        <span class="text-black text-[11px]">訂單確認</span>
      </div>
    </div>
    <!-- 手機版購物車 -->
     <section class="mt-[20px] mx-[20px] border-[1px] sm:hidden">
      <div class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]">
        <h3>購物車  (</h3>
        <span>X件)</span>
      </div>
      <div class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div class="relative grid grid-cols-[auto_1fr_auto]">
          <div>
            <img src="/src/img/蜂巢戒指.jpg" alt="商品圖片" class="w-[60px] h-[60px] object-cover">
          </div>
          <div class="mt-[5px] ml-[10px]">
            <div class="text-[12px]">蜂巢戒指</div>
            <div class="text-[10px] text-gray-400">F</div>
          </div>
          <!-- 單件價格 -->
          <div class="absolute top-[50px] right-0 flex items-end">
            <span class="text-[12px]">NT$1680</span>
          </div>
        </div>
        <div class="mt-[20px] flex justify-between">
          <!-- 數量 -->
          <form class="w-[160px] h-[34px] border-[1px] flex">
            <button class="w-[37px] border-r-[1px] flex justify-center items-center"><Minus stroke-width="3" class="size-4"/></button>
            <input type="number" class="w-[88px] focus:outline-none text-[12px] text-center" value="1" min="1">
            <button class="w-[37px] border-l-[1px] flex justify-center items-center"><Plus stroke-width="3" class="size-4"/></button>
          </form>
          <!-- 小計 -->
          <div class="flex items-end">
            <span class="text-[12px]">NT$1680</span>
          </div>
        </div>
        <div class="absolute top-[15px] right-[15px]">
          <Cross stroke-width="4" class="size-3"/>
        </div>
      </div>
     </section>
     <!-- 桌機版購物車 -->
     <section class="hidden mt-[20px] mx-[20px] border-[1px] sm:block sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]">
      <div class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]">
        <h3>購物車  (</h3>
        <span>X件)</span>
      </div>
      <div class="sm:grid grid-cols-[1.5fr_1fr_1fr_1fr] p-[15px] text-[11px]">
        <div>商品資料</div>
        <div>單件價格</div>
        <div class="text-center">數量</div>
        <div class="text-center">小計</div>
      </div>
      <div class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div class="relative grid grid-cols-[auto_1fr_auto]">
          <div>
            <img src="/src/img/蜂巢戒指.jpg" alt="商品圖片" class="w-[60px] h-[60px] object-cover">
          </div>
          <div class="mt-[5px] ml-[10px]">
            <div class="text-[12px]">蜂巢戒指</div>
            <div class="text-[10px] text-gray-400">F</div>
          </div>
        </div>
        <!-- 單件價格 -->
        <div class="sm:grid">
          <span class="text-[12px]">NT$1680</span>
        </div>
        <!-- 數量 -->
        <form class="w-full sm:flex justify-center items-center">
          <div class="h-[34px] max-w-[164px] border-[1px] flex justify-center items-center">
            <button class="w-[37px] border-r-[1px] flex justify-center items-center"><Minus stroke-width="3" class="size-3"/></button>
            <input type="number" class="max-w-[88px] focus:outline-none text-[12px] text-center sm:max-w-[48px] md:max-w-[85px]" value="1" min="1">
            <button class="w-[37px] border-l-[1px] flex justify-center items-center"><Plus stroke-width="3" class="size-3"/></button>
          </div>
        </form>
        <!-- 小計 -->
        <div class="text-center sm:block">
          <span class="text-[12px]">NT$1680</span>
        </div>
        <div class="absolute top-[15px] right-[15px]">
          <Cross stroke-width="4" class="size-3"/>
        </div>
      </div>
     </section>
     <div class="mt-[20px] mx-[20px] flex flex-col gap-[20px] sm:grid grid-cols-5 sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]">
        <!-- 選擇送貨及付款方式 -->
        <section class="w-full border-[1px] col-span-3">
         <div class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]">
           <h3>選擇送貨及付款方式</h3>
         </div>
         <div class="p-[15px]">
           <form class="flex flex-col gap-[20px]">
             <div class="flex flex-col">
               <label for="shippingAreaSelect" class="text-[11px]">送貨地點</label>
               <select 
               name="shippingArea" 
               id="shippingAreaSelect"
               class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none">
                 <option value="TW">台灣</option>
               </select>
             </div>
             <div class="flex flex-col">
               <label for="shippingMethodSelect" class="text-[11px]">送貨方式</label>
               <select 
               name="shippingMethod" 
               id="shippingMethodSelect"
               class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none">
                 <option value="TW">國內 宅配 ( 送貨需要3-7日 )</option>
               </select>
             </div>
             <div class="flex flex-col">
               <label for="paymentMethodSelect" class="text-[11px]">付款方式</label>
               <select 
               name="paymentMethod" 
               id="paymentMethodSelect"
               class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none">
                 <option value="TW">信用卡付款</option>
               </select>
             </div>
           </form>
         </div>
        </section>
        <!-- 訂單資訊 -->
        <section class="w-full border-[1px] col-span-2">
         <div class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]">
           <h3>訂單資訊</h3>
         </div>
         <div class="p-[15px] flex flex-col gap-[20px]">
           <div class="flex justify-between text-[11px]">
             <span>小計:</span>
             <span>NT$2560</span>
           </div>
           <div class="flex justify-between text-[11px]">
             <span>運費:</span>
             <span>NT$0</span>
           </div>
           <div class="w-full h-[1px] bg-gray-200"></div>
           <div class="flex justify-between text-[11px] font-bold">
             <span>合計 (X 件):</span>
             <span>NT$0</span>
           </div>
           <RouterLink to="/checkout">
            <button class="w-full h-[45px] mt-[30px] bg-green-500 text-white rounded-[5px]">前往結帳</button>
           </RouterLink>
         </div>
        </section>
     </div>
     <Footer class="mt-[80px]"/>
  </div>
</template>