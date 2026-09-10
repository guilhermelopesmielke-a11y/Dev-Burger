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

module.exports = {
	dialect: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	username: required("DB_USER"),
	password: required("DB_PASSWORD"),
	database: required("DB_NAME"),
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
