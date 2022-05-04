module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Photos', [
			{
				itemId: 28,
				photoUrl: '48_Captain-Cortez-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 28,
				photoUrl: '48_Captain-Cortez-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 29,
				photoUrl: '68_Captain-Vulkan-Hestan-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 29,
				photoUrl: '68_Captain-Vulkan-Hestan-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 30,
				photoUrl: '72_Captain-in-Gravis-Armour-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 30,
				photoUrl: '72_Captain-in-Gravis-Armour-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 30,
				photoUrl: '72_Captain-in-Gravis-Armour-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 30,
				photoUrl: '72_Captain-in-Gravis-Armour-4.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 31,
				photoUrl: '77_Lexicanum-Varus-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 31,
				photoUrl: '77_Lexicanum-Varus-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 31,
				photoUrl: '77_Lexicanum-Varus-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 31,
				photoUrl: '77_Lexicanum-Varus-4.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-4.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-5.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 32,
				photoUrl: '78_Leman-Russ-6.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 33,
				photoUrl: '79_Gun-Servitor-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 33,
				photoUrl: '79_Gun-Servitor-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 34,
				photoUrl: '80_Geigor-Fell-Hand-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 34,
				photoUrl: '80_Geigor-Fell-Hand-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 34,
				photoUrl: '80_Geigor-Fell-Hand-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 34,
				photoUrl: '80_Geigor-Fell-Hand-4.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 35,
				photoUrl: '81_Captain-Lysander-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 35,
				photoUrl: '81_Captain-Lysander-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 35,
				photoUrl: '81_Captain-Lysander-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 35,
				photoUrl: '81_Captain-Lysander-4.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 36,
				photoUrl: '82_Aleya-1.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 36,
				photoUrl: '82_Aleya-2.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				itemId: 36,
				photoUrl: '82_Aleya-3.jpeg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Photos', null, {});
	},
};
