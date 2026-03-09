import { DataTypes, Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            if (!this.path) return null;
            return `${process.env.APP_URL}/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,

        hooks: {
          beforeValidate: (category) => {
            if (category.name) {
              const trimmed = category.name.trim().toLowerCase();
              category.name =
                trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
            }
          },
        },
      },
    );
  }
}

export default Category;
