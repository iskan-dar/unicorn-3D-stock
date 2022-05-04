module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('PhysicalCopies', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			itemId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Items',
					key: 'id',
				},
			},
			color: {
				type: Sequelize.STRING,
			},
			scale: {
				type: Sequelize.STRING,
			},
			price: {
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
		await queryInterface.dropTable('PhysicalCopies');
	},
};
