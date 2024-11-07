<script setup>
import { adjusteSize, verify_active } from '@/utils/music/music';
const props = defineProps({
    data_following: {
        type: Array
    }
})
</script>
<template>
<div v-for="item in props.data_following" class="w-[90%] flex items-center gap-2 select-none cursor-pointer hover:brightness-[70%]">
    <div class="min-w-[3.5rem] h-[3.5rem] rounded-full bg-[#D9D9D9]"></div>
    <div class="ml-2 flex flex-col gap-[0.5px] text-base">
      <p class="text-xl font-normal text-white">{{ adjusteSize(item.title, 13, 13) }}</p>
    </div>
  </div>
</template>