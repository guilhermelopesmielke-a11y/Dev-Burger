import { v4 } from "uuid";
import User from "../models/User.js";
import * as Yup from "yup";
import bcrypt from "bcryptjs";


class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const {name, email, password, admin} = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        });

        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
    }
}

export default new UserController();