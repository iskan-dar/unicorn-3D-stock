module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Photos', [
			{
				itemId: 20,
				photoUrl: 'Anubis.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 21,
				photoUrl: 'Croc.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 22,
				photoUrl: 'Dalia.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 23,
				photoUrl: 'Delaila.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 24,
				photoUrl: 'Ra.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 25,
				photoUrl: 'Scorpio.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 26,
				photoUrl: 'Skeleton.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 27,
				photoUrl: 'Tribes.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Photos', null, {});
	},
};
