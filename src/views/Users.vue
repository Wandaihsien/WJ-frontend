<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import userIcon2 from '../components/svg/userIcon2.vue'
import Footer from '../components/Footer.vue'

const tabs = ['個人資訊', '訂單']
const activeTab = ref('個人資訊')
</script>

<template>
  <div class="w-full h-screen">
      <NavBar />
      <main class="w-full">
        <div class="hidden sm:block sm:max-w-[718px] sm:mx-auto sm:my-[20px] md:max-w-[938px] lg:max-w-[1108px]">
          <a href="" class="underline text-[13px]">登出</a>
        </div>
        <div class="sm:border sm:max-w-[718px] sm:mx-auto md:max-w-[938px] lg:max-w-[1108px]">
          <div class="w-full h-[56px] relative flex justify-center text-[12px] text-gray-500 :after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:left-0 after:bottom-0
        sm:after:w-0">
            <div v-for ="(tab , index) in tabs"
            :key="index"
            @click="activeTab = tab"
            class="relative cursor-pointer pt-[10px] sm:pt-[0] sm:w-full sm:flex"
            :class="{'sm:border-r sm:border-gray-300': index !== tabs.length - 1}">
              <span class="w-full px-[5px] sm:h-[56px] sm:flex sm:items-center sm:justify-center"
              :class="activeTab === tab ? 'text-black' : 'text-gray-500 sm:bg-gray-100 sm:border-b'">{{ tab }}</span>
              <div class="w-full h-[3px] absolute left-0 bottom-2 sm:hidden" :class="activeTab === tab ? 'bg-black' : 'bg-gray-200'" ></div>
            </div>
          </div>
          <div class="w-full px-[30px] pt-[20px]
          sm:">
            <div class="sm:hidden">
              <a href="" class="underline text-[13px]">登出</a>
            </div>
            <form v-if="activeTab === '個人資訊'" @submit.prevent="submitForm" class="w-full text-[14px]"> 
              <div class="flex mt-[30px] gap-[10px]">
                <userIcon2 class="size-5 text-gray-300"/>
                <p class="text-[15px] font-black pt-[2px]">XXX</p>
              </div>
              <div class="w-full md:flex md:gap-[20px]">
                <div class="border mt-[40px] p-[40px] md:w-[50%]">
                  <div class="flex gap-[10px]">
                    <userIcon2 class="size-5 text-gray-300"/>
                    <p class="text-[15px] font-bold pt-[2px]">會員資料</p>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="name">姓名</label>
                    <input 
                    type="text"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="email">電郵</label>
                    <input 
                    type="email"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="tel">手機號碼</label>
                    <input 
                    type="tel"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="gender">性別</label>
                    <select 
                    type="text"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                      <option value="male">男生</option>
                      <option value="female">女生</option>
                      <option value="other">不透漏</option>
                    </select>
                  </div>
                </div>
                <div class="border mt-[40px] p-[40px] md:w-[50%]">
                  <div class="flex gap-[10px]">
                    <userIcon2 class="size-5 text-gray-300"/>
                    <p class="text-[15px] font-bold pt-[2px]">送貨資料</p>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="text">收件人</label>
                    <input 
                    type="text"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="tel">收件人電話號碼</label>
                    <input 
                    type="tel"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="">城市/縣</label>
                    <select 
                    type="text"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="">地區</label>
                    <select 
                    type="text"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                    <label for="">地址</label>
                    <input 
                    type="tel"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"/>
                  </div>
                </div>
              </div>
              <div class="w-full flex gap-[10px] mt-[40px] mb-[40px] text-[14px] md:justify-end">
                <button type="button" class="border bg-white w-[50%] h-[34px] rounded-sm md:max-w-[54px]">取消</button>
                <button type="submit" class="border bg-black w-[50%] h-[34px] text-white rounded-sm md:max-w-[82px]">儲存變更</button>
              </div>
            </form>
            <table v-if="activeTab === '訂單'"
            class="w-full my-[50px] border-collapse table-auto text-sm">
              <thead class="hidden sm:table-header-group">
                <tr>
                  <th class="border px-4 py-2 text-left">訂單號碼</th>
                  <th class="border px-4 py-2 text-left">訂單日期</th>
                  <th class="border px-4 py-2 text-left">合計</th>
                  <th class="border px-4 py-2 text-left">訂單狀態</th>
                </tr>
              </thead>
              <tbody class="text-[12px]">
                <tr class="block sm:table-row border sm:border-0 mb-4 md:mb-0">
                  <td class="block sm:table-cell border px-4 py-2">
                    <span class="sm:hidden font-semibold">訂單號碼：</span>
                    20250122170216520
                  </td> 
                  <td class="block sm:table-cell border px-4 py-2">
                    <span class="sm:hidden font-semibold">訂單日期：</span>
                    2025-01-23
                  </td>
                  <td class="block sm:table-cell border px-4 py-2">
                    <span class="sm:hidden font-semibold">合計：</span>
                    NT$1,245
                  </td>
                  <td class="block sm:table-cell border px-4 py-2">
                    <span class="sm:hidden font-semibold">訂單狀態：</span>
                    未送達
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </main>
  </div>
</template>