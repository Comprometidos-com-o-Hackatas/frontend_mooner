<script setup>
import { useNavigationStore } from '@/stores';

const navigationStore = useNavigationStore()

const emits = defineEmits([
    'next', 'previous'
])

</script>

<template>
    <div class="absolute w-[105px] justify-center flex gap-3 bg-[rgba(27,27,27,0.6)] py-1 px-3 z-[60] rounded-md  items-center cursor-pointer">
        <span @click="navigationStore.previousPage(), emits('previous')" :class="navigationStore.simpleState.page == 1 ? ' brightness-50' : 'text-white'" class="mdi mdi-arrow-left-bold-box text-2xl"></span>
        <p class="text-white">{{navigationStore.simpleState.page}}</p>
        <span :class="navigationStore.simpleState.break ? ' brightness-50' : 'text-white'" @click="navigationStore.nextPage(), emits('next')" class="mdi mdi-arrow-right-bold-box text-2xl text-white"></span>
    </div>
</template>
