import { DataTypes, Model, Sequelize } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        path: DataTypes.STRING,
        offer: DataTypes.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            if (!this.path) return null;
            return `${process.env.APP_URL}/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Product;
