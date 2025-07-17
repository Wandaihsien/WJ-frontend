<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authState'
import { ShippingInfo, UserData, Order } from '../types/types'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'
import NavBar from '../components/NavBar.vue'
import UserIcon2 from '../components/svg/UserIcon2.vue'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/svg/BackToTop.vue'

const tabs = ['個人資訊', '訂單']
const activeTab = ref('個人資訊')

const authStore = useAuthStore()
const email = ref('')

const loadUserEmail = () => {
  if (localStorage.getItem('token')) {
    const emailFromStorage = localStorage.getItem('email')
    if (emailFromStorage) {
      email.value = emailFromStorage
    }
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const API_URL = import.meta.env.VITE_API_URL
const shippingInfo = ref<ShippingInfo>({
  recipient: '',
  recipientPhone: '',
  address: '',
})

const userData = ref<UserData>({
  name: '',
  phone: '',
})

const orders = ref<Order[]>([])
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${API_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    orders.value = res.data
  } catch (error) {
    console.error('取得訂單資訊失敗', error)
  }
}
const fetchShippingInfo = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${API_URL}/api/shippingInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    shippingInfo.value = res.data.shippingInfo
  } catch (error) {
    console.error('取得購物資訊失敗', error)
  }
}

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${API_URL}/api/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    userData.value = res.data.userData
  } catch (error) {
    console.error('取得會員資料失敗', error)
  }
}

const submitForm = async () => {
  try {
    const token = localStorage.getItem('token')
    // 建立或更新購物資訊
    await axios.post(`${API_URL}/api/shippingInfo`, shippingInfo.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // 更新會員資訊
    await axios.put(`${API_URL}/api/userData`, userData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    Swal.fire({
      icon: 'success',
      title: '資料送出成功',
      color: '#e1e1e1',
      background: '#27272a',
    })
  } catch (error) {
    console.error('送出用戶資訊失敗', error)
  }
}

const cancelButton = () => {
  fetchShippingInfo()
  fetchUserData()
}

onMounted(() => {
  loadUserEmail()
  fetchOrders()
  fetchShippingInfo()
  fetchUserData()
})
</script>

<template>
  <div class="w-full h-screen">
    <NavBar />
    <main class="w-full relative">
      <BackToTop />
      <div
        class="hidden sm:block sm:max-w-[718px] sm:mx-auto sm:my-[20px] md:max-w-[938px] lg:max-w-[1108px]"
      >
        <button @click="logout" class="underline text-[13px]">登出</button>
      </div>
      <div
        class="min-h-[350px] sm:border sm:max-w-[718px] sm:mx-auto md:max-w-[938px] lg:max-w-[1108px]"
      >
        <div
          class="w-full h-[56px] relative flex justify-center text-[12px] text-gray-500 :after:content-[''] after:w-full after:h-[1px] after:bg-gray-300 after:absolute after:left-0 after:bottom-0 sm:after:w-0"
        >
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab"
            class="relative cursor-pointer pt-[10px] sm:pt-[0] sm:w-full sm:flex"
            :class="{
              'sm:border-r sm:border-gray-300': index !== tabs.length - 1,
            }"
          >
            <span
              class="w-full px-[5px] sm:h-[56px] sm:flex sm:items-center sm:justify-center"
              :class="
                activeTab === tab
                  ? 'text-black'
                  : 'text-gray-500 sm:bg-gray-100 sm:border-b'
              "
              >{{ tab }}</span
            >
            <div
              class="w-full h-[3px] absolute left-0 bottom-2 sm:hidden"
              :class="activeTab === tab ? 'bg-black' : 'bg-gray-200'"
            ></div>
          </div>
        </div>
        <div class="w-full px-[30px] pt-[20px] sm:">
          <div class="sm:hidden">
            <button @click="logout" class="underline text-[13px]">登出</button>
          </div>
          <form
            v-if="activeTab === '個人資訊'"
            @submit.prevent="submitForm"
            class="w-full text-[14px]"
          >
            <div class="flex mt-[30px] gap-[10px]">
              <UserIcon2 class="size-5 text-gray-300" />
              <p class="text-[15px] font-black pt-[2px]">{{ email }}</p>
            </div>
            <div class="w-full md:flex md:gap-[20px]">
              <div class="border mt-[40px] p-[40px] md:w-[50%]">
                <div class="flex gap-[10px]">
                  <UserIcon2 class="size-5 text-gray-300" />
                  <p class="text-[15px] font-bold pt-[2px]">會員資料</p>
                </div>
                <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                  <label for="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    v-model="userData.name"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"
                  />
                </div>
                <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                  <label for="phone">手機號碼</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="userData.phone"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"
                  />
                </div>
                <!-- <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="gender">性別</label>
                    <select 
                    id="gender"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                      <option value="male">男生</option>
                      <option value="female">女生</option>
                      <option value="other">不透漏</option>
                    </select>
                  </div> -->
              </div>
              <div class="border mt-[40px] p-[40px] md:w-[50%]">
                <div class="flex gap-[10px]">
                  <UserIcon2 class="size-5 text-gray-300" />
                  <p class="text-[15px] font-bold pt-[2px]">送貨資料</p>
                </div>
                <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                  <label for="recipient">收件人</label>
                  <input
                    type="text"
                    id="recipient"
                    v-model="shippingInfo.recipient"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"
                  />
                </div>
                <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                  <label for="recipientPhone">收件人電話號碼</label>
                  <input
                    type="tel"
                    id="recipientPhone"
                    v-model="shippingInfo.recipientPhone"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"
                  />
                </div>
                <!-- <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="city">城市/縣</label>
                    <select 
                    id="city"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-[10px] mt-[20px] mb-[20px] text-gray-500 ">
                    <label for="district">地區</label>
                    <select 
                    id="district"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none">
                      <option disabled value>請選擇</option>
                    </select>
                  </div> -->
                <div class="flex flex-col gap-[10px] mt-[20px] text-gray-500">
                  <label for="address">地址</label>
                  <input
                    type="text"
                    id="address"
                    v-model="shippingInfo.address"
                    class="border w-full h-[44px] p-[10px] text-[14px] focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div
              class="w-full flex gap-[10px] mt-[40px] mb-[40px] text-[14px] md:justify-end"
            >
              <button
                @click="cancelButton"
                type="button"
                class="border bg-white w-[50%] h-[34px] rounded-sm md:max-w-[54px] hover:border-cyan-700"
              >
                取消
              </button>
              <button
                type="submit"
                class="border bg-cyan-700 w-[50%] h-[34px] text-white rounded-sm md:max-w-[82px]"
              >
                儲存變更
              </button>
            </div>
          </form>
          <table
            v-if="activeTab === '訂單'"
            class="w-full my-[50px] border-collapse table-auto text-sm"
          >
            <thead
              v-if="orders.length > 0"
              class="hidden sm:table-header-group"
            >
              <tr>
                <th class="border px-4 py-2 text-left">訂單號碼</th>
                <th class="border px-4 py-2 text-left">訂單日期</th>
                <th class="border px-4 py-2 text-left">合計</th>
                <th class="border px-4 py-2 text-left">訂單狀態</th>
              </tr>
            </thead>
            <tbody v-for="order in orders" :key="order.id" class="text-[12px]">
              <tr class="block sm:table-row border sm:border-0 mb-4 md:mb-0">
                <td class="block sm:table-cell border px-4 py-2">
                  <span class="sm:hidden font-semibold">訂單號碼：</span>
                  {{ order.tradeNo }}
                </td>
                <td class="block sm:table-cell border px-4 py-2">
                  <span class="sm:hidden font-semibold">訂單日期：</span>
                  {{ order.date.slice(0, 10) }}
                </td>
                <td class="block sm:table-cell border px-4 py-2">
                  <span class="sm:hidden font-semibold">合計：</span>
                  NT${{ order.total }}
                </td>
                <td class="block sm:table-cell border px-4 py-2">
                  <span class="sm:hidden font-semibold">訂單狀態：</span>
                  已付款
                </td>
              </tr>
            </tbody>
            <div
              v-if="orders.length === 0"
              class="mt-[60px] flex justify-center items-center text-center text-[16px] font-bold"
            >
              目前沒有任何訂單
            </div>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  </div>
</template>
