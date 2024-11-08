<script setup>
import { ref } from 'vue';
import bgBox from '@/components/community/bgBox.vue'
import cRow from '@/components/community/communitiesRow.vue'

const communities = ref([
    {
        name: 'Comunidade 1',
        description: 'Descrição da comunidade 1',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 2',
        description: 'Descrição da comunidade 2',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 3',
        description: 'Descrição da comunidade 3',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 4',
        description: 'Descrição da comunidade 4',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 5',
        description: 'Descrição da comunidade 5',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 6',
        description: 'Descrição da comunidade 6',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 7',
        description: 'Descrição da comunidade 7',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 8',
        description: 'Descrição da comunidade 8',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 9',
        description: 'Descrição da comunidade 9',
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Comunidade 10',
        description: 'Descrição da comunidade 10',
        image: 'https://placekitten.com/200/200'
    },
])

</script>

<template>
    <header>
        <!--Header aqui-->
    </header>

    <bgBox class="flex flex-col gap-2 p-4">
        <div class="w-full ">
            <h2 class="text-xl font-extralight">Comunidades Que Decolam</h2>
        </div>
        <cRow class="overflow-x-visible ">
            <div class="flex flex-col justify-center w-[35%] h-full rounded-xl relative">
                <div class="flex w-full h-[50%] bg-blue-200">
                    <div class="w-full">
                        <img class="w-full h-full"
                            src="https://thumbs.dreamstime.com/z/modelo-de-banner-espa%C3%A7o-psicod%C3%A9lico-do-ai-generativo-nost%C3%A1lgico-s-ilustra%C3%A7%C3%A3o-horizontal-da-futura-paisagem-com-montanhas-273354485.jpg?ct=jpeg"
                            alt="">
                    </div>
                    <div>

                    </div>
                </div>
                <div class="">
                    <img class="absolute w-[50px] h-[50px] rounded-full"
                        src="https://wallpapers.com/images/featured/foto-de-perfil-legal-2we7xmn0737hqgtu.jpg"
                        alt="ProfileImage">
                </div>
                <div class="w-full h-[50%] bg-red-200"></div>
            </div>
        </cRow>
    </bgBox>
</template>

<style scoped></style>