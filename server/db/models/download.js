const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Download extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
    }
  }
  Download.init({
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Download',
  });
  return Download;
};
