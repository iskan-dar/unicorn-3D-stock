module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Photos', [
			{
				itemId: 1,
				photoUrl: 'Vehicle-Chimera-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 2,
				photoUrl: 'Vehicle-Pred.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 3,
				photoUrl: 'Vehicle-Russ-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 4,
				photoUrl: 'Vehicle-Sicaran.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 5,
				photoUrl: 'Vehicle-Vendic-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 6,
				photoUrl: 'Character-AF95-MFF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 7,
				photoUrl: 'Character-XX-8-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 8,
				photoUrl: 'Character-XX-86-CS-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 9,
				photoUrl: 'Character-XX-88-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 10,
				photoUrl: 'Character-XX-104-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 11,
				photoUrl: 'Character-XX-1104-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 12,
				photoUrl: 'Location-MMF-1.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 13,
				photoUrl: 'Location-MMF-2.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 14,
				photoUrl: 'Location-MMF-3.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 15,
				photoUrl: 'Location-MMF-4.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 16,
				photoUrl: 'Weapon-Basilisk-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 17,
				photoUrl: 'Weapon-Earthshaker-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 18,
				photoUrl: 'Weapon-Manticore-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 19,
				photoUrl: 'Weapon-Sentinel-MMF.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Photos', null, {});
	},
};
