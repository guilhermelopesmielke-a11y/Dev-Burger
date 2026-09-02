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
// Importa o hook customizado criado no PASSO 3.
import { useUser } from "../../hooks/UserContext";



export function Login() {
    const navigate = useNavigate();

    /*
      PASSO 4 DO FLUXO — quem GRAVA os dados no contexto.

      Esta linha "sintoniza na antena" e pega de dentro do contexto só a função
      de que esta tela precisa: putUserData.
      Isso só funciona porque o Login está dentro do <AppProvider> (main.jsx).
    */
    const {putUserData} = useUser()

    const schema = yup.object().shape({
        email: yup.string().email("O email é inválido").required("o email é obrigatório"),
        password: yup.string().min(6,"A senha deve ter pelo menos 6 caracteres").required("a senha é obrigatória")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    // Só roda se o yup aprovar os campos. O 'data' vem preenchido pelo react-hook-form.
    const onSubmit = async (data) => {
        // 'data: userData' é renomeação na desestruturação: a resposta do axios vem
        // como { data: ... }, e aqui chamamos esse conteúdo de userData.
        // Antes pegávamos só o token; agora guardamos o objeto inteiro do usuário
        // (id, nome, admin e o token), porque o contexto precisa de tudo isso.
        const {data: userData} = await toast.promise(
            api.post("/session", {
                email: data.email,
                password: data.password
            }),
            {
                pending: "Autenticando...",
                success: {
                    render(){
                        // Espera 2s só para o usuário conseguir ler o aviso de sucesso
                        // antes de a tela mudar.
                        setTimeout(() => {
                            if(userData?.admin)
                                navigate("/admin/pedidos")
                            else
                                navigate("/home")
                        }, 2000)
                        return "Login realizado com sucesso!"
                    }
                },
                error: "Erro ao realizar login."
            }
        );

        // Entrega os dados para o contexto (PASSO 3).
        // A partir daqui, QUALQUER tela do app consegue ler esse usuário com
        // useUser(), e o api.js consegue pegar o token no localStorage (PASSO 5).
        putUserData(userData)
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="Logo" />
            </LeftContainer>

            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer</span>!<br /> Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email" {...register("email")}/>
                        <p>{errors.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" {...register("password")}/>
                        <p>{errors.password?.message}</p>
                    </InputContainer>
                    
                    <Button type="submit">Entrar</Button>
                </Form>
                <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
            </RightContainer>
        </Container>
    )
}