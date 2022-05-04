const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ItemsAndTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ItemsAndTag.init({
		itemId: DataTypes.INTEGER,
		tagId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'ItemsAndTag',
	});
	return ItemsAndTag;
};
