<script setup lang="ts">
import { ref,defineProps, defineEmits } from 'vue';
import { useCartStore } from '../stores/useCartStore';
import { Product, CartItem } from '../types/types'
import Cross from './svg/Cross.vue';
import Plus from './svg/Plus.vue';
import Minus from './svg/Minus.vue';


defineProps<{
  product: {
    id:number,
    name:string;
    price:number;
    image:string;
  };
}>();

const emit = defineEmits(['close','openCart'])

const addQuantity = ref(1)
const minus = () => {
  if(addQuantity.value > 1) {
    addQuantity.value --
  }
}
const add = () => {
  if(addQuantity.value < 20) {
    addQuantity.value ++
  }
}


const cartStore = useCartStore()
const addProductToCart = (product:Product,addQuantity:number) => {
  cartStore.addToCart(product,addQuantity)
  emit('close')
  emit('openCart')
}

</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-50 z-[996]"></div>

  <div class="w-[calc(100%-40px)] h-[480px] ml-[20px] mr-[20px] mt-[50px] overflow-y-auto fixed top-[150px] flex flex-col bg-white z-[997] sm:max-w-[640px] sm:max-h-[388px] sm:flex-row sm:mx-auto 
  sm:left-1/2 sm:translate-x-[-50%]">
    <div @click="$emit('close')" class="fixed right-[20px] top-[200px] w-[36px] h-[36px] cursor-pointer bg-black text-white flex justify-center items-center sm:top-[0] sm:right-[0]">
      <Cross />
    </div>
    <div class="w-full">
      <img :src="product.image" alt="商品照片" class="object-cover w-full h-[300px]">
    </div>
    <div class="w-full">
      <div class="w-full px-[20px] mt-[20px]">
        <h2 class="font-bold text-[22px]">{{ product.name }}</h2>
        <p class="font-bold text-[17px] mt-[20px]">NT${{ product.price }}</p>
        <div class="mt-[20px] flex justify-center items-center">
          <button @click="minus" class="w-[34px] h-[34px] border-[2px] border-black rounded-[50%] cursor-pointer flex justify-center items-center">
            <Minus />
          </button>
          <p class="mx-[40px]">{{ addQuantity }}</p>
          <button @click="add" class="w-[34px] h-[34px] border-[2px] border-black rounded-[50%] cursor-pointer flex justify-center items-center">
            <Plus />
          </button>
        </div>
      </div>
      <div class="w-full mt-[40px] mb-[10px]">
        <button @click="addProductToCart(product,addQuantity)" class="w-[50%] h-[45px] bg-black text-white text-[14px] font-bold">加入購物車</button>
        <button class="w-[50%] h-[45px] bg-black text-white text-[14px] font-bold">立即購買</button>
      </div>
    </div>
  </div>
</template>