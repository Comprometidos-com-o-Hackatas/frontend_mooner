<script setup>
import { adjusteSize } from '@/utils/music/music';

const props = defineProps({
    data: {
        type: Object
    },
    is_queue: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'action'
])

</script>
<template>
                <div class="flex gap-3 w-[100%] hover:bg-[rgba(27,27,27,0.6)] py-2 px-3 rounded-lg items-center relative">
                    <div class="w-[25%] h-[45px] ">
                        <img class="rounded-md w-full h-full" :src="props.data?.cover?.url" alt="">
                    </div>
                    <div class="flex justify-center w-[72%] flex-col">
                        <p v-for="item in props.data?.artists" class="text-[10px]">{{item.artistic_name}}</p>
                        <p class=" font-semibold text-[15px]">{{props.data ? adjusteSize(props.data?.title, 10, 14) : ''}}</p>
                    </div>
                    <span @click="emits('action', props.data.id)" v-if="props.is_queue" class="mdi mdi-minus-circle absolute text-lg right-5 text-[#AA5AF5] cursor-pointer"></span>
                </div>
</template>