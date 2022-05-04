const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Item, { foreignKey: 'subCategoryId' });
    }
  }
  SubCategory.init({
    subCategoryTitle: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};
