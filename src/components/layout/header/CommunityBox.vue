<script setup>
import { adjusteSize, verify_active } from '@/utils/music/music';
import { useNavigationStore } from '@/stores';
const navigationStore = useNavigationStore()
const props = defineProps({
    data_community: {
        type: Array
    }
})

const emits = defineEmits([
  'create'
])
</script>
<template>
    <div v-for="item in props.data_community" class="w-[90%] flex items-center select-none cursor-pointer hover:brightness-[70%]">
    <div class="min-w-[5rem] h-[5rem] rounded-xl">
      <img class="w-full h-full rounded-xl" :src="item.cover.file">
    </div>
    <div class="ml-2 flex flex-col gap-[0.5px] text-base">
      <p class="text-xl font-normal text-white">{{ adjusteSize(item.name, 30, 30) }}</p>
      <p class="text-lg font-light text-white break-words">
        {{ item.autor.length == 0 ? '' : adjusteSize(item.autor.email, 16, 16) }}
      </p>
    </div>
  </div>
  <div class="w-[90%] flex items-center cursor-pointer select-none">
    <div class="hover:brightness-[70%] min-w-[5rem] h-[5rem] rounded-xl border-2 flex justify-center items-center active:scale-[.9] duration-100"><p class="text-4xl text-white selectnone" @click="emits('create')">+</p></div>
    <div class="ml-2 flex flex-col gap-[0.5px] text-base">
      <p class="text-xl font-normal text-white">Crie Sua Nova Comunidade</p>
    </div>
  </div>
</template>