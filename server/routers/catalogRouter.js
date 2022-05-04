const catalogRouter = require('express').Router();
const Models = require('../db/models');

catalogRouter.get('/', async (req, res) => {
	try {
		const allItems = await Models.Item.findAll({
			raw: true,
			include: [
				{
					model: Models.Category,
					attributes: ['categoryTitle'],
					required: true,
				},
				{
					model: Models.Collection,
					attributes: ['id', 'collectionName'],
					required: true,
				},
				{
					model: Models.SubCategory,
					attributes: ['subCategoryTitle'],
					required: true,
				},
				{
					model: Models.Photo,
					attributes: ['photoUrl'],
					required: true,
				},
				{
					model: Models.PhysicalCopy,
					attributes: ['itemId', 'color', 'scale', 'price'],
					required: true,
				},
			],
			order: [['id', 'DESC']],
		});

		const result = allItems.filter((el, i, a) => a.findIndex((elem) => (elem.id === el.id)) === i);

		res.json(result);
	} catch (error) {
		console.log(error);
	}
});

module.exports = catalogRouter;
