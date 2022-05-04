'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Categories', [{
			categoryTitle: 'warhammer',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'fantasy',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'sci-fi',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'terrain',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'space marines',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'astrates',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'tech guys',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			categoryTitle: 'giga robots',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
