import app from "./app.js";
import "./database/index.js";

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
