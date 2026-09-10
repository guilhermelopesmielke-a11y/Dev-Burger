import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
import databaseConfig from "../config/database.cjs";

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			.map(
				(model) => model.associate && model.associate(this.connection.models),
			);
	}

	mongo() {
		// 127.0.0.1 em vez de localhost: no Windows o Node resolve 'localhost' como ::1 (IPv6),
		// e o proxy do Docker aceita a conexao IPv6 mas nao entrega ao container.
		this.mongoConnection = mongoose.connect(
			process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devburguer",
		);
	}
}

export default new Database();
