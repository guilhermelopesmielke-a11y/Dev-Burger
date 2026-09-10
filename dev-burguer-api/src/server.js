import app from "./app.js";
import "./database/index.js";

// A plataforma de deploy escolhe a porta e a entrega em PORT. Ignorar essa
// variavel e fixar 3000 faz o health check falhar e o deploy nunca subir.
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
