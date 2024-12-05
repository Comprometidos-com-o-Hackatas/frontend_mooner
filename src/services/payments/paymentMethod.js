import api from "@/plugins/api";

class PaymentMethodService{
    async CreatePayment(payload, token, email){
        const response = await api.post(`payment/${email}/`, payload, {headers: {Authorization: `Bearer ${token}`}})
        return response
    }
    async GetQrCode(email){
        const {data} = await api.get(`payment/${email}/`, )
        return data
    }
    async GetPaymentStatus(){
        const response = await api.post(`payment_status/`)
        return response
    }
}

export default new PaymentMethodService 