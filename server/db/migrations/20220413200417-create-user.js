module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
			},
			lastName: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			avatarUrl: {
				type: Sequelize.STRING,
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			isMaker: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			isCreator: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			isActivated: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			activationLink: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
