import Sequelize, { Model } from "sequelize";

class Category extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            path:Sequelize.STRING,
             url:{
                type: Sequelize.VIRTUAL,
                get() {
                    // Mesma regra do Product: o host da API vem do ambiente.
                    const baseUrl = process.env.APP_URL || "http://localhost:3000";

                    return `${baseUrl}/category-file/${this.path}`;
                }
            }
        },
        {
            sequelize,
            tableName: "categories",
        });
        return this;
    }
}

export default Category;
