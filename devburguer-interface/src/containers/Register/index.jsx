import { Container, Form, InputContainer, RightContainer, Title, Link } from "./styles"
import Logo from '../../assets/Logo 1.png'
import { LeftContainer } from "./styles"
import { Button } from "../../components/Button"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export function Register() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("O email é inválido").required("o email é obrigatório"),
        password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("a senha é obrigatória"),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais").required("A confirmação de senha é obrigatória")
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        try {
            const { status } = await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password
            },
                {
                    validateStatus: () => true,
                }
            )
            if (status === 201 || status === 200) {
                toast.success("Conta criada com sucesso!")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else if (status === 409) {
                toast.error("Email já cadastrado!")
            } else {
                throw new Error()
            }

            console.log(status);
        }

        catch {
            toast.error("Falha no sistema! Tente novamente")
        }
    }




return (
    <Container>
        <LeftContainer>
            <img src={Logo} alt="Logo" />
        </LeftContainer>

        <RightContainer>
            <Title>
                Criar conta!
            </Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <label>Nome</label>
                    <input type="text" placeholder="Digite seu nome" {...register("name")} />
                    <p>{errors.name?.message}</p>
                </InputContainer>
                <InputContainer>
                    <label>Email</label>
                    <input type="email" placeholder="Digite seu email" {...register("email")} />
                    <p>{errors.email?.message}</p>
                </InputContainer>

                <InputContainer>
                    <label>Senha</label>
                    <input type="password" placeholder="Digite sua senha" {...register("password")} />
                    <p>{errors.password?.message}</p>
                </InputContainer>

                <InputContainer>
                    <label>Confirmar Senha</label>
                    <input type="password" placeholder="Confirme sua senha" {...register("confirmPassword")} />
                    <p>{errors.confirmPassword?.message}</p>
                </InputContainer>

                <Button type="submit">Criar conta</Button>
            </Form>
            <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </RightContainer>
    </Container>
)
}
