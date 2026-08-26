import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number(),
            offers: Yup.boolean(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation failed" });
        }

        const { name, price, category_id, offers } = req.body;
        const { filename } = req.file;

        const newProduct = await Product.create({
            name,
            price,
            category_id,
            path: filename,
            offers
        });

        return res.status(201).json(newProduct);

    }
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offers: Yup.boolean(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation failed" });
        }

        const { name, price, category_id, offers } = req.body;
        const{ id } = req.params;

        let path
        if (req.file) {
            const { filename } = req.file;
            path = filename;
        }

        await Product.update({
            name,
            price,
            category_id,
            path,
            offers
        }, {
            where:{
                id
            }
        });

        return res.status(200).json();
    }

    async index(_req, res) {
        try {
            const products = await Product.findAll({
                include: {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                }
            });
            return res.status(200).json(products);
        } catch (_error) {
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export default new ProductController();