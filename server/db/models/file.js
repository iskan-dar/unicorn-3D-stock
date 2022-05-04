const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
    }
  }
  File.init({
    itemId: DataTypes.INTEGER,
    fileUrl: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
