import Sequelize, { Model } from "sequelize";

class Product extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            price:Sequelize.FLOAT,
            path:Sequelize.STRING,
            offers:Sequelize.BOOLEAN,
            category_id:Sequelize.INTEGER,
            url:{
                type: Sequelize.VIRTUAL,
                get(){
                    // APP_URL e o endereco publico desta propria API. Fixar o
                    // localhost aqui faria o front em producao pedir a imagem
                    // para a maquina de quem esta navegando.
                    const baseUrl = process.env.APP_URL || "http://localhost:3000";

                    return `${baseUrl}/product-file/${this.path}`;
                }
            }
        },
        {
            sequelize,
            tableName: "products",
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
    }
}

export default Product;
