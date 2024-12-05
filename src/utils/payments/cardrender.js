import { useLoginStore, usePaymentStore } from "@/stores";
import { costumization } from "./settings/costumization";
const LoginStore = useLoginStore()
const paymentstore = usePaymentStore()

export const renderPaymentBrick = async (bricksBuilder, amount, token, name) => {
    const settings = {
      initialization: {
        amount: 0.01,
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
            paymentstore.createPayment(payload, token, LoginStore.user.email)
        },
        onError: (error) => {
          console.error(error);
        },
      },
    };
    window.paymentBrickController = await bricksBuilder.create(
      "payment",
      "paymentBrick_container",
      settings
    );
  };