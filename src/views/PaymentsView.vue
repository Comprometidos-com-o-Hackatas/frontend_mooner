<script setup>
import { onMounted, ref } from 'vue';
import { renderPaymentBrick } from '@/utils/payments/cardrender';
import { useLoginStore, usePaymentStore } from '@/stores';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import router from '@/router';

const qrCode = ref(null);
const paymentStatus = ref("Aguardando pagamento...");
const mp = new MercadoPago('APP_USR-4713fdb5-e6e9-4883-8abb-112e4a053e82', {
    locale: 'pt'
});
const bricksBuilder = mp.bricks({ theme: 'dark' });
const paymentStore = usePaymentStore();
const Loginstore = useLoginStore();

function userPremium(){
    Loginstore.state.access = '';
    Loginstore.state.user.email = '';
    Loginstore.state.user.password = '';
    Loginstore.state.refresh = '';
    router.push('/login');
}

async function fetchPaymentStatus() {
    try {
        const response = await paymentStore.getPaymentStatus(Loginstore.user.email);
        console.log(response)
    } catch (error) {
        console.error("Erro ao verificar o status do pagamento:", error);
    }
}

onMounted(async () => {
    const price = paymentStore.typeAssign.assign.price;
    const name_product = paymentStore.typeAssign.assign.name;
    await renderPaymentBrick(bricksBuilder, price, Loginstore.access, name_product);
    qrCode.value = await paymentStore.getQRcode(Loginstore.user.email);
    console.log(qrCode.value);

    const pollingInterval = setInterval(async () => {
        await fetchPaymentStatus();
        if (paymentStatus.value === "Pagamento aprovado!") {
            clearInterval(pollingInterval);
        }
    }, 5000);
});

const changeFormat = ref(true);
</script>

<template>
    <div class="w-full flex flex-col justify-center items-center p-[50.1px] h-auto">
        <div @click="changeFormat = !changeFormat">pix</div>
        <MsgGlobal v-show="paymentStore.msg" :msg="paymentStore.msg" :err="paymentStore.err" @confirm="userPremium"/>
        <div id="paymentBrick_container" v-if="changeFormat"></div>
        <div v-else>
            <img width="300" :src="`data:image/png;base64,${qrCode.qr_code_base64}`">
        </div>
        <p>Status do pagamento: {{ paymentStatus }}</p>
    </div>
</template>
