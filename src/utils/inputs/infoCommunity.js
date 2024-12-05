import { ref } from "vue";

export const CommunityInput = ref([
    {
        fieldname: 'nome',
        required: true,
        value: ''
    },
    {
        fieldname: 'descricão',
        type: 'textarea',
        required: true,
        value: ''
    }
])