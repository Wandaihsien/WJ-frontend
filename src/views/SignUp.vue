<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue';
</script>
<template>
  <div class="w-full min-h-screen">
    <NavBar />
    <main class="w-full pl-[30px] pr-[30px] pt-[20px] pb-[20px] sm:w-[420px] flex justify-center flex-col mx-auto mt-[20px]">
      <p class="text-[32px] font-black">註冊會員</p>
      <form action="" class="w-full mt-[40px]">
        <div class="w-full flex flex-col">
          <label for="username" class="hidden text-red-500 text-[12px]">電郵或手機號碼</label>
          <input id="username" type="text" placeholder="電郵或手機號碼" required class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]">
          <div class="hidden text-red-500 text-[12px]">電郵或手機號碼是必須的</div>
        </div>
        <div class="w-full flex flex-col mt-[30px]">
          <label for="password" class="hidden text-red-500 text-[12px]">密碼</label>
          <input id="password" type="password" placeholder="密碼(至少8個字元)" required class="w-full pb-[10px] pt-[5px] placeholder:text-[14px] outline-none border-b text-[14px]">
          <div class="hidden text-red-500 text-[12px]">密碼是必須的</div>
        </div>
        <button class="w-full h-[46px] font-bold mt-[60px] bg-black text-white rounded-[0.25rem]">註冊</button>
      </form>
      <p class="text-[30px] font-semibold mt-[70px]">已經有帳號?</p>
      <button class="w-full h-[46px] border border-black rounded-[0.25rem] mt-[20px] font-bold">登入</button>
    </main>
    <Footer />
  </div>
</template>