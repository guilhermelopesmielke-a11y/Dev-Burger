import * as Yup from "yup";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.js";

class SessionController {
    async store(req, res) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        const isValid = await schema.isValid(req.body, {strict: true});

        const emailOrPasswordIncorrect = ()=> {
            return res.status(400).json({ error: "email or password is invalid" });
        }

        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const {email, password} = req.body;

        const exisistingUser = await User.findOne({ where: { email } });
        const passwordMatch = exisistingUser && await bcrypt.compare(password, exisistingUser.password_hash);

        if (!exisistingUser) {
            return emailOrPasswordIncorrect();
        }

        if (!passwordMatch) {
            return emailOrPasswordIncorrect();
        }

        const token = jwt.sign({ id:exisistingUser.id, admin:exisistingUser.admin, name:exisistingUser.name }, authConfig.secret,{
            expiresIn: authConfig.expiresIn,
        })

        return res.json({ 
            id: exisistingUser.id,
            name: exisistingUser.name,
            email: exisistingUser.email,
            admin: exisistingUser.admin,
            token
        });
    }
}

export default new SessionController();