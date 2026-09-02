import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    user:{
        id:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        }
    },
    products:[{
        id:{
            type:Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        url:{
            type: String,
            required: true,
        }
    }],
    status:{
        type: String,
        required: true,
    },
    // Chave de idempotencia do webhook: o Stripe reenvia eventos, e um Pix
    // dispara dois eventos para a mesma sessao. 'sparse' porque pedidos antigos,
    // feitos antes do Stripe, nao tem esse campo e nao podem colidir no indice.
    stripeSessionId:{
        type: String,
        unique: true,
        sparse: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model("Order", OrderSchema);