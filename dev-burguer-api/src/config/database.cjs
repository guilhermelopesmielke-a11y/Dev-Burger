// Carrega o .env manualmente: o servidor recebe --env-file pelo script "dev",
// mas o sequelize-cli (migrations) executa este arquivo sem essa flag.
try {
	process.loadEnvFile();
} catch {
	// .env ausente - seguimos com as variaveis ja presentes no ambiente
}

const required = (name) => {
	const value = process.env[name];

	if (!value) {
		throw new Error(
			`${name} nao definido. Copie o .env.example para .env e preencha a variavel.`,
		);
	}

	return value;
};

// Provedores gerenciados (Neon, Supabase, Render) entregam UMA string de
// conexao em vez das cinco variaveis separadas. Quando ela existe, ela manda:
// evita ter que quebrar a URL na mao e errar no encoding da senha.
const fromUrl = (url) => {
	const parsed = new URL(url);

	return {
		host: parsed.hostname,
		port: Number(parsed.port) || 5432,
		username: decodeURIComponent(parsed.username),
		password: decodeURIComponent(parsed.password),
		database: parsed.pathname.replace(/^\//, ""),
	};
};

const fromParts = () => ({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	username: required("DB_USER"),
	password: required("DB_PASSWORD"),
	database: required("DB_NAME"),
});

const connection = process.env.DATABASE_URL
	? fromUrl(process.env.DATABASE_URL)
	: fromParts();

// Postgres em nuvem so aceita conexao criptografada. O Postgres local do
// docker-compose nao tem certificado, por isso o SSL fica desligado por padrao
// e liga sozinho quando a conexao vem de uma DATABASE_URL.
const useSsl = process.env.DB_SSL
	? process.env.DB_SSL === "true"
	: Boolean(process.env.DATABASE_URL);

module.exports = {
	dialect: "postgres",
	...connection,
	// rejectUnauthorized: false porque Neon e Supabase assinam o certificado com
	// uma CA propria, que o Node nao traz na lista de confiaveis.
	...(useSsl && {
		dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
	}),
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
