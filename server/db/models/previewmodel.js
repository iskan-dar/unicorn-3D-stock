'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreviewModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate({Item}) {
        // define association here
        this.belongsTo(Item, { foreignKey: 'itemId' });
      }
  }
  PreviewModel.init({
    itemId: DataTypes.INTEGER,
    previewModelLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PreviewModel',
  });
  return PreviewModel;
};