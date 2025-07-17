<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import router from '../router'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Plus from '../components/svg/Plus.vue'
import Minus from '../components/svg/Minus.vue'
import Cross from '../components/svg/Cross.vue'
import BackToTop from '../components/svg/BackToTop.vue'

const minus = (item: any) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}
const add = (item: any) => {
  if (item.quantity < 20) {
    item.quantity++
  }
}

const cartStore = useCartStore()

watch(
  () =>
    cartStore.cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
  (newItems, oldItems) => {
    if (oldItems) {
      newItems.forEach((newItem, index) => {
        const oldItem = oldItems[index]
        if (oldItem && newItem.quantity !== oldItem.quantity) {
          cartStore.updateCartQuantity(newItem.id, newItem.quantity)
        }
      })
    }
  }
)
onMounted(() => {
  cartStore.loadCart()
})
</script>
<template>
  <div class="w-full h-screen relative">
    <NavBar />
    <BackToTop />
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
          class="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-gray-300 after:content-[''] after:w-[50%] after:h-[2px] after:bg-gray-300 after:absolute after:left-[50%] after:z-[-1] before:content-[''] before:w-[50%] before:h-[2px] before:bg-gray-300 before:absolute before:left-[0] before:z-[-1]"
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
    <div
      v-if="cartStore.cartItems.length == 0"
      class="h-[50%] mt-[20px] mx-[20px] flex flex-col justify-center items-center"
    >
      <h5 class="text-[18px] font-bold">你的購物車是空的</h5>
      <p class="text-[12px]">記得加入商品到你的購物車</p>
      <RouterLink to="/" class="mt-[20px]">
        <button
          class="w-[180px] h-[34px] bg-black text-white text-center text-[12px] sm:w-[364px]"
        >
          繼續購物
        </button>
      </RouterLink>
    </div>
    <!-- 手機版購物車 -->
    <section
      v-if="cartStore.cartItems.length > 0"
      class="mt-[20px] mx-[20px] border-[1px] sm:hidden"
    >
      <div
        class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
      >
        <h3>購物車 (</h3>
        <span>{{ cartStore.cartItems.length }}件)</span>
      </div>
      <div
        v-for="item in cartStore.cartItems"
        :key="item.id"
        class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
      >
        <div class="relative grid grid-cols-[auto_1fr_auto]">
          <div>
            <img
              :src="item.product.image"
              alt="商品圖片"
              class="w-[60px] h-[60px] object-cover"
            />
          </div>
          <div class="mt-[5px] ml-[10px]">
            <div class="text-[12px]">{{ item.product.name }}</div>
            <div class="text-[10px] text-gray-400">F</div>
          </div>
          <!-- 單件價格 -->
          <div class="absolute top-[50px] right-0 flex items-end">
            <span class="text-[12px]">NT${{ item.product.price }}</span>
          </div>
        </div>
        <div class="mt-[20px] flex justify-between">
          <!-- 數量 -->
          <div class="w-[160px] h-[34px] border-[1px] flex">
            <button
              @click="minus(item)"
              class="w-[37px] border-r-[1px] flex justify-center items-center"
            >
              <Minus stroke-width="3" class="size-4" />
            </button>
            <input
              v-model="item.quantity"
              type="number"
              class="w-[88px] focus:outline-none text-[12px] text-center"
              max="100"
              min="1"
            />
            <button
              @click="add(item)"
              class="w-[37px] border-l-[1px] flex justify-center items-center"
            >
              <Plus stroke-width="3" class="size-4" />
            </button>
          </div>
          <!-- 小計 -->
          <div class="flex items-end">
            <span class="text-[12px]"
              >NT${{ item.product.price * item.quantity }}</span
            >
          </div>
        </div>
        <div
          @click="cartStore.removeFromCart(item.product.id)"
          class="absolute top-[15px] right-[15px]"
        >
          <Cross stroke-width="4" class="size-3" />
        </div>
      </div>
    </section>
    <!-- 桌機版購物車 -->
    <section
      v-if="cartStore.cartItems.length > 0"
      class="hidden mt-[20px] mx-[20px] border-[1px] sm:block sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
    >
      <div
        class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
      >
        <h3>購物車 (</h3>
        <span>{{ cartStore.cartItems.length }}件)</span>
      </div>
      <div class="sm:grid grid-cols-[1.5fr_1fr_1fr_1fr] p-[15px] text-[11px]">
        <div>商品資料</div>
        <div>單件價格</div>
        <div class="text-center">數量</div>
        <div class="text-center">小計</div>
      </div>
      <div
        v-for="item in cartStore.cartItems"
        :key="item.id"
        class="relative p-[10px] border-t-[1px] sm:w-full sm:grid sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
      >
        <div class="relative grid grid-cols-[auto_1fr_auto]">
          <div>
            <img
              :src="item.product.image"
              alt="商品圖片"
              class="w-[60px] h-[60px] object-cover"
            />
          </div>
          <div class="mt-[5px] ml-[10px]">
            <div class="text-[12px]">{{ item.product.name }}</div>
            <div class="text-[10px] text-gray-400">F</div>
          </div>
        </div>
        <!-- 單件價格 -->
        <div class="sm:grid">
          <span class="text-[12px]">NT${{ item.product.price }}</span>
        </div>
        <!-- 數量 -->
        <div class="w-full sm:flex justify-center items-center">
          <div
            class="h-[34px] max-w-[164px] border-[1px] flex justify-center items-center"
          >
            <button
              @click="minus(item)"
              class="w-[37px] border-r-[1px] flex justify-center items-center"
            >
              <Minus stroke-width="3" class="size-3" />
            </button>
            <input
              v-model="item.quantity"
              type="number"
              class="focus:outline-none text-[12px] text-center sm:w-[48px] md:w-[85px]"
              min="1"
              max="100"
            />
            <button
              @click="add(item)"
              class="w-[37px] border-l-[1px] flex justify-center items-center"
            >
              <Plus stroke-width="3" class="size-3" />
            </button>
          </div>
        </div>
        <!-- 小計 -->
        <div class="text-center sm:block">
          <span class="text-[12px]"
            >NT${{ item.product.price * item.quantity }}</span
          >
        </div>
        <div
          @click="cartStore.removeFromCart(item.product.id)"
          class="absolute top-[15px] right-[15px] cursor-pointer"
        >
          <Cross stroke-width="4" class="size-3" />
        </div>
      </div>
    </section>
    <div
      v-if="cartStore.cartItems.length > 0"
      class="mt-[20px] mx-[20px] flex flex-col gap-[20px] sm:grid grid-cols-5 sm:max-w-[720px] sm:mx-auto md:max-w-[938px] lg:max-w-[1138px]"
    >
      <!-- 選擇送貨及付款方式 -->
      <section class="w-full border-[1px] col-span-3">
        <div
          class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
        >
          <h3>選擇送貨及付款方式</h3>
        </div>
        <div class="p-[15px]">
          <form class="flex flex-col gap-[20px]">
            <div class="flex flex-col">
              <label for="shippingAreaSelect" class="text-[11px]"
                >送貨地點</label
              >
              <select
                name="shippingArea"
                id="shippingAreaSelect"
                class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              >
                <option value="TW">台灣</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="shippingMethodSelect" class="text-[11px]"
                >送貨方式</label
              >
              <select
                name="shippingMethod"
                id="shippingMethodSelect"
                class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              >
                <option value="TW">國內 宅配 ( 送貨需要3-7日 )</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="paymentMethodSelect" class="text-[11px]"
                >付款方式</label
              >
              <select
                name="paymentMethod"
                id="paymentMethodSelect"
                class="h-[34px] text-[11px] mt-[5px] pl-[10px] border-[1px] focus:outline-none"
              >
                <option value="TW">信用卡付款</option>
              </select>
            </div>
          </form>
        </div>
      </section>
      <!-- 訂單資訊 -->
      <section class="w-full border-[1px] col-span-2">
        <div
          class="w-full flex items-center bg-gray-100 text-[14px] p-[15px] border-b-[1px]"
        >
          <h3>訂單資訊</h3>
        </div>
        <div class="p-[15px] flex flex-col gap-[20px]">
          <div class="flex justify-between text-[11px]">
            <span>小計:</span>
            <span>NT${{ cartStore.cartPriceTotal }}</span>
          </div>
          <div class="flex justify-between text-[11px]">
            <span>運費:</span>
            <span>NT$0</span>
          </div>
          <div class="w-full h-[1px] bg-gray-200"></div>
          <div class="flex justify-between text-[11px] font-bold">
            <span>合計 :</span>
            <span> NT${{ cartStore.cartPriceTotal }} </span>
          </div>
          <button
            @click="router.push('/checkout')"
            class="w-full h-[45px] mt-[30px] bg-green-500 text-white rounded-[5px] hover:bg-green-400"
          >
            前往結帳
          </button>
        </div>
      </section>
    </div>
    <Footer class="mt-[80px]" />
  </div>
</template>
