module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('SubCategories', [{
			subCategoryTitle: 'vehicles',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			subCategoryTitle: 'characters',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			subCategoryTitle: 'locations',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			subCategoryTitle: 'weapons',
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('SubCategories', null, {});
	},
};
