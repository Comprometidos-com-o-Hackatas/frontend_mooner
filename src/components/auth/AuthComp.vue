<script setup>
    import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
    import InputGlobal from '@/components/global/InputGlobal.vue';
    defineProps({
        is_login_page:{
            type: Boolean,
            required: true
        },
        inputs_page:{
            type: Array,
            required: true
        },
        action_btn: {
            type: Function,
            required: true
        }
    })
</script>
<template>
<div class="container">
    <div :class="is_login_page ? 'main-login' : 'main-signup'">
    </div>
    <div class="content-container">
        <div class="content">
            <div class="text-content">
                <img src="../../assets/images/Logo.png">
                <h1>{{is_login_page ? 'Bem Vindo ao Mooner' : 'Crie a sua conta'}}</h1>
                <p>{{is_login_page ? "Entregando qualidade dentro e fora de orbita" : "Aproveite a sensação de navegar pelo melhor app de musica"}}</p>
            </div>
            <div class="auth-content">
                <h1>{{is_login_page ? "Iniciar Sessão" : 'Registrar'}}</h1>
                <InputGlobal v-for="info in inputs_page" :key="info.id" :type="info.type" :field_name="info.fieldname" :maxlength="info.maxlength" :is_required="info.required" :minlength="info.minlength" :placeholder="info.placeholder" v-model:value="info.value"></InputGlobal>
                <div class="actions-container">
                    <div class="actions">
                        <RouterLink :to="is_login_page ? '/password' : '/password'">{{is_login_page ? 'esqueci a minha senha' : 'dúvidas'}}</RouterLink>
                        <RouterLink :to="is_login_page ? '/sign-up' : '/login'">{{is_login_page ? 'não possuo uma conta' : 'ja possuo uma conta'}}</RouterLink>
                    </div>
                    <div class="btn-container">
                        <ButtonGlobal :is_arrow="false" background="#8000ff" width="100%" border="none" font_size="25px" border_radius="10px" color="white"  :title="is_login_page ? 'Iniciar sessão' : 'Registrar-se'" @click="action_btn"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>