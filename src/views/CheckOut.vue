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
          class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-300 before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]"
        >
          <span class="text-white text-center text-[12px] font-bold">3</span>
        </div>
        <span class="text-black text-[11px]">訂單確認</span>
      </div>
    </div>
    <!-- 購物車 -->
    <div
      class="mt-[20px] mx-[20px] border-[1px] sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
    >
      <!-- 手機版購物車 -->
      <section class="border-b-[1px] sm:hidden">
        <div
          class="w-full flex items-center text-[15px] font-bold p-[15px] border-b-[1px]"
        >
          <h3>合計:NT$2460</h3>
          <span>購物車 (X件)</span>
        </div>
        <div
          class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          <div class="relative grid grid-cols-[auto_1fr_auto]">
            <div>
              <img
                src="/src/img/蜂巢戒指.jpg"
                alt="商品圖片"
                class="w-[60px] h-[60px] object-cover"
              />
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
          <div class="mt-[40px] flex justify-between">
            <!-- 數量 -->
            <div class="text-[11px] text-gray-700">
              <span>數量:1</span>
            </div>
            <!-- 小計 -->
            <div class="flex items-end">
              <span class="text-[12px]">NT$1680</span>
            </div>
          </div>
        </div>
      </section>
      <!-- 桌機版購物車 -->
      <section
        class="hidden border-b-[1px] sm:block sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
      >
        <div
          class="w-full h-[94px] flex flex-col justify-center items-center text-[15px] font-bold p-[15px] border-b-[1px]"
        >
          <h3>合計:NT$2460</h3>
          <span>購物車 (X件)</span>
        </div>
        <div class="sm:grid grid-cols-[1.5fr_1fr_1fr_1fr] p-[15px] text-[11px]">
          <div>商品資料</div>
          <div>單件價格</div>
          <div class="text-center">數量</div>
          <div class="text-right">小計</div>
        </div>
        <div
          class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          <div class="relative grid grid-cols-[auto_1fr_auto]">
            <div>
              <img
                src="/src/img/蜂巢戒指.jpg"
                alt="商品圖片"
                class="w-[60px] h-[60px] object-cover"
              />
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
          <div class="text-center sm:block">
            <span class="text-[12px]">1</span>
          </div>
          <!-- 小計 -->
          <div class="text-right sm:block">
            <span class="text-[12px]">NT$1680</span>
          </div>
        </div>
      </section>
      <div class="p-[15px] flex flex-col gap-[20px]">
        <div class="flex justify-between text-[12px]">
          <span>小計:</span>
          <span>NT$2560</span>
        </div>
        <div class="flex justify-between text-[12px]">
          <span>運費:</span>
          <span>NT$0</span>
        </div>
        <div class="w-full h-[1px] bg-gray-200"></div>
        <div class="flex justify-between text-[12px] font-bold">
          <span>合計 (X 件):</span>
          <span>NT$0</span>
        </div>
      </div>
      <!-- <div class="w-full h-[50px] border-t-[1px]"></div> -->
    </div>
    <div
      class="mt-[20px] mx-[20px] flex flex-col gap-[20px] sm:grid grid-cols-2 sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
    >
      <!-- 送貨資料 -->
      <section class="w-full border-[1px] col-span-1">
        <div
          class="w-full flex justify-between items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
        >
          <h3>訂單資訊</h3>
          <span class="text-[11px] text-gray-600">運費: NT$0</span>
        </div>
        <div class="p-[15px]">
          <p class="text-[11px]">
            已選擇的送貨方式: 國內 宅配( 送貨需要3-7日 )
          </p>
          <form class="mt-[10px] flex flex-col gap-[20px]">
            <div class="flex flex-col text-[11px]">
              <label for="guestName" class="text-[11px]">收件人名稱</label>
              <input
                id="guestName"
                type="text"
                class="h-[34px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              />
              <span class="mt-[5px] text-gray-500"
                >請填入收件人真實姓名，以確保順利收件</span
              >
            </div>
            <div class="flex flex-col">
              <label for="shippingAreaSelect" class="text-[11px]"
                >收件人電話</label
              >
              <input
                id="guestPhone"
                type="text"
                placeholder="0912 345 678"
                class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              />
            </div>
            <div class="w-full h-[1px] bg-gray-300"></div>
            <!-- 地址 -->
            <div class="flex flex-col">
              <p class="text-[11px] mb-[10px]">送貨地點: 台灣</p>
              <label for="address" class="text-[11px]">地址</label>
              <input
                id="address"
                type="text"
                placeholder="地址"
                class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              />
            </div>
          </form>
        </div>
      </section>
      <section class="w-full border-[1px] col-span-1">
        <!-- 付款資料 -->
        <div>
          <div
            class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
          >
            <h3>付款資料</h3>
          </div>
          <div class="p-[15px] pb-[30px] flex flex-col gap-[20px]">
            <div class="text-[11px]">已選擇的付款方式: 信用卡付款</div>
            <div class="text-[11px]">
              <label for="cardNumber" class="sr-only">卡號</label>
              <input
                id="cardNumber"
                type="number"
                placeholder="卡號"
                class="w-full h-[50px] rounded-l text-[14px] mt-[5px] pl-[15px] border-[1px] focus:outline-blue-500"
              />
            </div>
            <div class="text-[11px]">
              <label for="cardOwner" class="sr-only">持卡人姓名</label>
              <input
                id="cardOwner"
                type="string"
                placeholder="持卡人姓名"
                class="w-full h-[50px] rounded-l text-[14px] mt-[5px] pl-[15px] border-[1px] focus:outline-blue-500"
              />
            </div>
            <div class="text-[11px]">
              <label for="ValidDate" class="sr-only">有效日期</label>
              <input
                id="ValidDate"
                type="number"
                placeholder="有效期 ( MM/YY )"
                class="w-full h-[50px] rounded-l text-[14px] mt-[5px] pl-[15px] border-[1px] focus:outline-blue-500"
              />
            </div>
            <div class="text-[11px]">
              <label for="cardCode" class="sr-only">安全碼</label>
              <input
                id="cardCode"
                type="number"
                placeholder="安全碼"
                class="w-full h-[50px] rounded-l text-[14px] mt-[5px] pl-[15px] border-[1px] focus:outline-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div
      class="mt-[20px] mx-[20px] p-[20px] flex justify-center items-center flex-col border-[1px] sm:flex-row-reverse sm:justify-between sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
    >
      <button
        class="w-full h-[34px] bg-green-500 text-white text-[12px] rounded-[5px] sm:max-w-[314px] md:max-w-[424px] lg:max-w-[524px]"
      >
        提交訂單
      </button>
      <RouterLink
        to="/cart"
        class="text-[12px] text-center mt-[15px] text-blue-500"
      >
        < 返回購物車
      </RouterLink>
    </div>
    <div class="h-[60px]"></div>
  </div>
</template>
