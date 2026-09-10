// Este segredo assina os tokens JWT. Quem tiver o valor consegue forjar um
// token de qualquer usuario, inclusive admin - por isso ele vive no .env e
// nunca no controle de versao.
//
// Para gerar um segredo novo:
//   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
const secret = process.env.JWT_SECRET;

if (!secret) {
	throw new Error(
		"JWT_SECRET nao definido. Copie o .env.example para .env e preencha a variavel.",
	);
}

export default {
	secret,
	expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
