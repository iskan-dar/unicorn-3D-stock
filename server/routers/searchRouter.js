const express = require('express');
const { Op } = require('sequelize');
const Models = require('../db/models');

const itemsRouter = express.Router();

// this endpoint is deprecated TODO make sure delete it
itemsRouter.get('/', async (req, res) => {
	try {
		const allItems = Models.Item.findAll({ raw: true });
		res.json({ allItems });
	} catch (error) {
		console.log('{{{searchRouter.get("/") err}}}', error);
	}
});

itemsRouter.post('/item', async (req, res) => {
	try {
		const { search, category, subCategory } = req.body;
		console.log('{{{}}}{{{{itemTitle search>>>>', search);
		const result = await Models.Item.findAll({
			raw: true,
			where: { itemTitle: { [Op.iLike]: `%${search}%` } },
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

		const foundItems = result.filter((el, i, a) => a.findIndex((el2) => (el2.id === el.id)) === i);
		res.json({ foundItems });
	} catch (error) {
		console.log('{{{{{searchRouter.post("/item") err}}}}', error);
	}
});

module.exports = itemsRouter;
