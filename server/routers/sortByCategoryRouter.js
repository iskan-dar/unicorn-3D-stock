const sortByCategoryRouter = require('express').Router();
const Models = require('../db/models');

sortByCategoryRouter.get('/', async (req, res) => {
	console.log(req.query);
	try {
		const { category, subCategory } = req.query;
		const sortedItems = await Models.Item.findAll({
			raw: true,
			include: [
				{
					model: Models.Category,
					where: { categoryTitle: category },
					attributes: ['categoryTitle'],
					required: true,
				},
				{
					model: Models.SubCategory,
					where: { subCategoryTitle: subCategory },
					attributes: ['subCategoryTitle'],
					required: true,
				},
				{
					model: Models.Photo,
					attributes: ['photoUrl'],
					required: true,
				},
			],
		});
		const result = sortedItems.filter((el, i, a) => a.findIndex((el2) => (el2.id === el.id)) === i);
		res.json({ result });
	} catch (error) {
		console.log(error);
	}
});

module.exports = sortByCategoryRouter;
