<script setup>
    import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';

    defineProps({
        data: {
            type: Array,
            required: true
        }
    })
</script>

<template>
    <div class="w-full">
        <div class="flex justify-center align-center overflow-hidden flex-wrap gap-4 max-w-[1800px] p-5">
            <div v-for="item in data" :key="item.id" class="w-[450px] h-[375px] gap-2" >
                <div class="flex flex-col justify-center w-full h-full relative">
                    <div class="flex flex-col justify-center w-full h-[100%]">

                        <div class="w-full relative h-[50%]">
                            <div class="w-full flex justify-end">
                                <span class="mdi mdi-dots-vertical absolute z-[1] text-black w-10"></span>
                            </div>
                            <img class="relative rounded-t-lg"
                                :src="item.cover.url">
                        </div>

                        <div class="flex ml-4 absolute z-[1] max-w-[95%] h-14">
                            <div>
                                <img class="w-14 h-14 rounded-full object-contain bg-red-400">
                            </div>
                            <div class="flex last:items-end">
                                <h1 class="w-full align-bottom text-base- text-white">{{item.name}}</h1>
                            </div>
                        </div>

                        <div class="flex flex-col relative w-[100%] h-[50%] bg-gray-800 rounded-b-lg gap-4 ">
                            <div class="flex h-[70%] justify-center items-end">
                                <h4 class="flex  max-w-[90%] items-center text-xs text-white">{{item.description}}</h4>
                            </div>
                            <div class="flex justify-between w-full h-[10%] ">
                                <div class="w-[34.5%] flex justify-center items-center">
                                    <h4 class="text-xs font-thin">
                                        <!-- Numero de mebros --> dada
                                    </h4>
                                </div>
                                <div class="flex justify-center items-center rounded-lg w-[25%] p-4 h-full bg-purple-700">
                                    <ButtonGlobal title="Entrar" color="white" @click="router.push(`/community/${item.id}/`)"/>
                                </div>
                                <div class="w-[37.5%] flex justify-center items-center">
                                    <h4 class="text-xs font-thin">
                                        <!-- Numero de membros online--> faddsds
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>