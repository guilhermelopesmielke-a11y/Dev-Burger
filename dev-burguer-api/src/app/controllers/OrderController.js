import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../../database/schemas/Order.js";
class OrderController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            )
        });

        try{
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ err: err.errors });
        }

        const { userId, userName } = req
        const { products } = req.body;

        const findedProducts = await Product.findAll({
            where:{
                id:products.map(product => product .id)
            },
            include:{
                model: Category,
                as: "category",
                attributes: ["name"]
            }
        })

        const mapedProducts = findedProducts.map(product => {
            const quantity = products.find(p => p.id === product.id).quantity;
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                url: product.url,
                category: product.category.name,
                quantity: quantity
            }

            return newProduct;
        })

        const order = {
            user:{
                id: userId,
                name: userName
            },
            products:mapedProducts,
            status: 'Pedido realizado'
        }

        const newOrder = await Order.create(order);

        return res.status(201).json(newOrder);
    }

    async update(req, res) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { status } = req.body;
        const { id } = req.params;

        try{
            await Order.updateOne({_id: id},{ status });            
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        return res.status(200).json("Order status updated");
    }

    async index(_req, res) {
        const orders = await Order.find();
        return res.status(200).json(orders);
    }
}

export default new OrderController();