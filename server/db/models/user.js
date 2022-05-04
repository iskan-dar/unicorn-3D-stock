const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.hasMany(models.Token, { foreignKey: 'userId' });
			this.hasMany(models.Item, { foreignKey: 'userId' });
			this.hasMany(models.WishList, { foreignKey: 'userId' });
			this.hasMany(models.Download, { foreignKey: 'userId' });
			this.hasMany(models.ShoppingCart, { foreignKey: 'userId' });
		}
	}
	User.init({
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		phone: DataTypes.STRING,
		avatarUrl: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		isMaker: DataTypes.BOOLEAN,
		isCreator: DataTypes.BOOLEAN,
		isActivated: DataTypes.BOOLEAN,
		activationLink: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};
