import axios from "axios";


// Instância única do axios usada por todo o app.
// baseURL: o endereço do back-end. Assim nas telas basta escrever api.post("/session")
// em vez de repetir o endereço da API em cada chamada.
//
// O endereço vem de VITE_API_URL porque ele muda entre a máquina de
// desenvolvimento e o servidor de produção. O fallback mantém o `pnpm dev`
// funcionando sem precisar criar um .env local.
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
})

/*
  PASSO 5 DO FLUXO — o "interceptador" de requisições.

  Esta função roda AUTOMATICAMENTE antes de toda requisição feita com 'api',
  em qualquer lugar do projeto. É um ponto único por onde tudo passa.

  Serve para não ter que anexar o token manualmente em cada chamada:
  o back-end exige o token nas rotas protegidas (produtos, pedidos...),
  e é aqui que ele é grudado no cabeçalho.
*/
api.interceptors.request.use((config) => {
    // Lê o mesmo item que o putUserData gravou no PASSO 3.
    // Repare que a chave 'devburger:userData' precisa ser IDÊNTICA nos dois
    // arquivos — se uma letra divergir, o token nunca é encontrado.
    const userData = localStorage.getItem('devburger:userData');

    // Proteção contra usuário deslogado: se userData for null, o && interrompe
    // e o token vira null, sem quebrar a aplicação com JSON.parse(null).token.
    // O JSON.parse é necessário porque o localStorage devolve TEXTO, e só depois
    // de virar objeto conseguimos acessar a propriedade .token.
    const token = userData && JSON.parse(userData).token;

    // Formato exigido pelo padrão Bearer: a palavra "Bearer", espaço, e o token.
    config.headers.authorization = `Bearer ${token}`;

    // Obrigatório devolver o config: é ele, já modificado, que segue viagem
    // para o back-end. Sem esse return, nenhuma requisição sai.
    return config;
})
