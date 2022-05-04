/* eslint-disable prefer-template */
const uuid = require('uuid');
const path = require('path');
const {
	Tag,
	File,
	Item,
	Photo,
	Category,
	SubCategory,
	ItemsAndTag,
	PhysicalCopy,
} = require('../db/models');

module.exports.addItem = async (req, res, next) => {
	console.log(
		'<<<<<<<addItem REQ.BODY REQ.FILES>>>>>>>',
		req.body,
		req.files,
	);

	try {
		const { zip, photos } = req.files;

		const photoNames = [];
		if (Array.isArray(photos)) {
			photos.forEach((photo) => {
				const photoName = uuid.v4() + '.jpg';
				photo.mv(path.resolve(__dirname, '..', 'static', photoName));
				photoNames.push(photoName);
			});
		} else {
			const photoName = uuid.v4() + '.jpg';
			photos.mv(path.resolve(__dirname, '..', 'static', photoName));
			photoNames.push(photoName);
		}

		const zipNames = [];
		if (Array.isArray(zip)) {
			zip.forEach((oneZip) => {
				const zipName = uuid.v4() + '.jpg';
				oneZip.mv(
					path.resolve(__dirname, '..', 'static', uuid.v4() + '.zip'),
				);
				zipNames.push(zipName);
			});
		} else {
			const zipName = uuid.v4() + '.jpg';
			zip.mv(path.resolve(__dirname, '..', 'static', uuid.v4() + '.zip'));
			zipNames.push(zipName);
		}

		const category = await Category.findOne({
			where: { categoryTitle: req.body.category1 },
			raw: true,
		});

		const subCategory = await SubCategory.findOne({
			where: { subCategoryTitle: req.body.category2 },
			raw: true,
		});

		const newItem = await Item.create({
			userId: 4, // ХАРДКОД
			categoryId: category.id,
			subCategoryId: subCategory.id,
			collectionId: 3, // ХАРДКОД
			itemTitle: req.body.title,
			digitalPrice: req.body.digitalPrice,
			isApproved: false,
			description: req.body.description,
		});

		// ===================================================================

		const tagIdArr = [];

		const tagsArr = req.body.tags;

		if (Array.isArray(tagsArr)) {
			tagsArr.forEach(async (tag) => {
				const existingTag = await Tag.findOne({
					where: { tagName: tag },
					raw: true,
				});
				if (existingTag) {
					tagIdArr.push(existingTag.id);
				} else {
					const newTag = await Tag.create({ tagName: tag });
					tagIdArr.push(newTag.id);
				}
			});
		} else {
			const existingTag = await Tag.findOne({
				where: { tagName: req.body.tags },
				raw: true,
			});
			if (existingTag) {
				tagIdArr.push(existingTag.id);
			} else {
				const newTag = await Tag.create({ tagName: req.body.tags });
				tagIdArr.push(newTag.id);
			}
		}

		// Можно оставить!
		setTimeout(() => {
			tagIdArr.forEach(async (el) => {
				await ItemsAndTag.create({ itemId: newItem.id, tagId: el });
			});
		}, 2000);

		// ===================================================================

		photoNames.forEach(async (photoName) => {
			await Photo.create({
				itemId: newItem.dataValues.id,
				photoUrl: photoName,
			});
		});

		zipNames.forEach(async (zipName) => {
			await File.create({
				itemId: newItem.dataValues.id,
				photoUrl: zipName,
			});
		});

		const { color } = req.body;
		const [scale, price] = req.body.scale.split(' - ');

		await PhysicalCopy.create({
			itemId: newItem.dataValues.id,
			color,
			scale,
			price,
		});

		// =========TODO: COMPLETE THIS JOIN LATER======== //
		// const result = await Item.findOne({
		// 	raw: true,
		// 	where: {
		// 		id: newItem.dataValues.id,
		// 	},
		// 	include: [
		// 		{
		// 			model: Category,
		// 			where: { categoryTitle: category },
		// 			required: true,
		// 		},
		// 		{
		// 			model: SubCategory,
		// 			where: { subCategoryTitle: subCategory },
		// 			required: true,
		// 		},
		// 		{
		// 			model: Photo,
		// 			attributes: ['photoUrl'],
		// 			required: true,
		// 		},
		// 		{
		// 			model: File,
		// 			attributes: ['fileUrl'],
		// 			required: true,
		// 		},
		// 		{
		// 			model: PhysicalCopy,
		// 			attributes: ['color', 'scale', 'price'],
		// 			required: true,
		// 		},
		// 		{
		// 			model: Tag,
		// 			through: { attributes: ['itemId', 'tagId'] },
		// 			// required: true,
		// 		},
		// 	],
		// });

		return res.json(newItem);
	} catch (error) {
		console.error('{{{{{{addItem<<<<error>>>>}}}}}}', error);
		next(error);
	}
};

module.exports.getOneItem = async (req, res, next) => {

	try {
		const item = await Item.findAll({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Photo,
					attributes: ['photoUrl'],
				},
				{
					model: PhysicalCopy,
					attributes: ['scale', 'color', 'price'],
					required: true,
				},
				{
					model: Tag,
					attributes: [['id', 'tagId'], 'tagName'],
					// required: true,
				},
			],
			raw: true,
		});

		const photoArr = item.map((el) => el['Photos.photoUrl']).filter((el, i, a) => a.indexOf(el) === i);
		const tagArr = item.map((el) => el['Tags.ItemsAndTags.tagId']).filter((el, i, a) => a.indexOf(el) === i);
		item[0]['Photos.photoUrl'] = photoArr;
		item[0]['Tags.ItemsAndTags.tagId'] = tagArr;

		res.json(item[0]);
	} catch (error) {
		console.error('{{{{{{getOneItem<<<<error>>>>}}}}}}', error);
		next(error);
	}
};

module.exports.getAllItems = async (req, res, next) => {
	try {
		const allItems = await Item.findAll({
			raw: true,
			include: [
				{
					model: Photo,
					attributes: ['photoUrl'],
				},
			],
			limit: 4,
		});
		res.json(allItems);
	} catch (error) {
		console.error('{{{{{{getOneItem<<<<error>>>>}}}}}}', error);
		next(error);
	}
};
