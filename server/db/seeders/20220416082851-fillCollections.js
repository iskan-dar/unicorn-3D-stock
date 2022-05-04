module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Collections', [{

			collectionName: 'MMF',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			collectionName: 'MUMMIES',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			collectionName: 'FORGE WORLD',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			collectionName: 'DREADS',
			createdAt: new Date(),
			updatedAt: new Date(),
		},

		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Collections', null, {});
	},
};
