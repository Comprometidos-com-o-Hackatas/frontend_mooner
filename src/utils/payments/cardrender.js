import { useLoginStore, usePaymentStore } from "@/stores";
import { costumization } from "./settings/costumization";
const LoginStore = useLoginStore()
const paymentstore = usePaymentStore()

export const renderPaymentBrick = async (bricksBuilder, amount, name) => {
    const settings = {
      initialization: {
        amount: amount,
        description: name,
        preferenceId: "MA7t83X20VixtYFtkoX4FpJbKMQzGQMh",
        payer: {
          email: LoginStore.state.user.email,
        },
      },
      customization: costumization,
      callbacks: {
        onReady: (ready) => {
          console.log(ready)
        },
        onSubmit: ({formData}) => {
            const payload = {
                formData,
                description: settings.initialization.description
            }
            paymentstore.createPayment(payload)
        },
        onError: (error) => {
          console.error(error);
        },
      },
      qr_code: {
        enabled: true,
        type: 'qr_code',
        size: '150x150',
      },
    };
    window.paymentBrickController = await bricksBuilder.create(
      "payment",
      "paymentBrick_container",
      settings
    );
  };