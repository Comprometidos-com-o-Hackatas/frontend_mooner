<script setup>
    defineProps({
        answer: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <div>
        <div  class='answer'  >
            <p v-html="answer"></p>
        </div>
        <div class="response">
            <p v-html="response ? response : 'Lunna esta gerando sua resposta...'"></p>
        </div>
    </div>
</template>