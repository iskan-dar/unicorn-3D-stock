const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Item extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'userId' });
			this.belongsTo(models.Category, { foreignKey: 'categoryId' });
			this.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
			this.belongsTo(models.Collection, { foreignKey: 'collectionId' });
			this.hasOne(models.WishList, { foreignKey: 'itemId' });
			this.hasOne(models.Download, { foreignKey: 'itemId' });
			this.hasMany(models.Photo, { foreignKey: 'itemId' });
			this.hasMany(models.File, { foreignKey: 'itemId' });
			this.belongsToMany(models.Tag, {
				through: 'ItemsAndTags',
				foreignKey: 'itemId',
				otherKey: 'tagId',
			});
			this.hasMany(models.PhysicalCopy, { foreignKey: 'itemId' });
		}
	}
	Item.init({
		userId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		subCategoryId: DataTypes.INTEGER,
		collectionId: DataTypes.INTEGER,
		itemTitle: DataTypes.STRING,
		digitalPrice: DataTypes.FLOAT,
		isApproved: DataTypes.BOOLEAN,
		description: DataTypes.TEXT,
	}, {
		sequelize,
		modelName: 'Item',
	});
	return Item;
};
