<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/svg/BackToTop.vue'

const slidesImg = [
  '/img/輪播圖1.png',
  '/img/輪播圖3.png',
  '/img/輪播圖4.png',
  '/img/輪播圖5.png',
]

const products = [
  {
    id: 1,
    name: '騷動項鍊',
    price: 'NT$5210',
    image: '/img/騷動項鍊5210.png',
  },
  {
    id: 2,
    name: '宇宙項鍊',
    price: 'NT$2850',
    image: '/img/宇宙項鍊2850.png',
  },
  {
    id: 3,
    name: '城市手環',
    price: 'NT$2350',
    image: '/img/城市手環2350.png',
  },
  {
    id: 4,
    name: '保證手環',
    price: 'NT$2950',
    image: '/img/保證手環2950.png',
  },
  {
    id: 5,
    name: '狂亂項鍊',
    price: 'NT$3650',
    image: '/img/狂亂項鍊3650.png',
  },
  {
    id: 6,
    name: '反彈項鍊',
    price: 'NT$3650',
    image: '/img/反彈項鍊3650.png',
  },
]

const prevEl = ref(null)
const nextEl = ref(null)
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow relative">
      <BackToTop />
      <swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{ delay: 10000 }"
        :loop="true"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="(img, index) in slidesImg" :key="index">
          <div class="w-full h-[200px] sm:h-[300px] md:h-[80vh]">
            <img :src="img" alt="找不到圖片" class="w-full h-full" />
          </div>
        </SwiperSlide>
      </swiper>
      <div
        class="w-full relative mt-[50px] px-[50px] md:max-w-[1100px] md:mx-auto"
      >
        <div class="text-center text-[20px] mb-[40px]">即將上架</div>
        <div
          ref="prevEl"
          class="w-[50px] h-[50px] flex justify-center items-center absolute left-[25px] top-1/2 opacity-[0.5] bg-gray-600 text-white cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.7)] z-10 hover:opacity-[0.3]"
        >
          <span> ← </span>
        </div>
        <div
          ref="nextEl"
          class="w-[50px] h-[50px] flex justify-center items-center absolute right-[25px] top-1/2 opacity-[0.5] bg-gray-600 text-white cursor-pointer z-10 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:opacity-[0.2]"
        >
          <span>→</span>
        </div>
        <swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :space-between="20"
          :navigation="{ prevEl, nextEl }"
          :breakpoints="{
            0: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }"
        >
          <swiper-slide v-for="item in products" :key="item.id">
            <div class="text-center">
              <div>
                <img :src="item.image" class="w-full aspect-square mb-2" />
              </div>
              <p class="text-[12px]">{{ item.name }}</p>
              <p class="text-[11px] text-gray-500 mt-[2px]">
                {{ item.price }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </main>
    <Footer />
  </div>
</template>
<style>
.swiper-pagination-bullet {
  width: 9px;
  height: 9px;
  background-color: rgb(161, 160, 160);
  opacity: 0.8;
}

.swiper-pagination-bullet-active {
  background-color: #0e7490;
  width: 9px;
  height: 9px;
}
</style>
