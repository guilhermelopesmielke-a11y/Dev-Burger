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
                    return `http://localhost:3000/product-file/${this.path}`;
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


