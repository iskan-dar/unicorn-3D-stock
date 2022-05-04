module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			categoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Categories',
					key: 'id',
				},
			},
			subCategoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'SubCategories',
					key: 'id',
				},
			},
			collectionId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Collections',
					key: 'id',
				},
			},
			itemTitle: {
				type: Sequelize.STRING,
			},
			digitalPrice: {
				type: Sequelize.FLOAT,
			},
			isApproved: {
				type: Sequelize.BOOLEAN,
				default: false,
			},
			description: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable('Items');
	},
};
