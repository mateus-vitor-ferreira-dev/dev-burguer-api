import Stripe from 'stripe';
import * as Yup from 'yup';
import 'dotenv/config.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        // se vier em reais (ex: 29.9), converte pra centavos
        // se já vier em centavos (ex: 2990), isso também funciona
        const priceInCents =
            current.price < 1000 ? Math.round(current.price * 100) : Math.round(current.price);

        return acc + priceInCents * current.quantity;
    }, 0);

    return Math.max(total, 0);
};

class CreatePaymentIntentController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required().min(1),
                        price: Yup.number().required(),
                    }),
                ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });

            const { products } = request.body;

            const amount = Math.round(calculateOrderAmount(products));

            if (amount < 50) { // exemplo: 50 centavos
                return response.status(400).json({
                    error: "Valor inválido",
                    message: "O valor do pedido está muito baixo ou carrinho vazio.",
                });
            }

            console.log("AMOUNT (centavos):", amount);

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "brl",
                automatic_payment_methods: { enabled: true },
            });

            // console.log("PAYMENT INTENT:", paymentIntent.id);

            return response.json({
                clientSecret: paymentIntent.client_secret,
                dpmCheckerLink: `https://dashboard.stripe.com/test/payments/${paymentIntent.id}`
            });


        } catch (error) {
            // console.log("STRIPE ERROR:", error);

            return response.status(500).json({
                error: "Erro ao criar pagamento",
                message: error.message,
            });
        }
    }
}

export default new CreatePaymentIntentController();
