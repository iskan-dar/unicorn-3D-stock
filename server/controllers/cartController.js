const { ShoppingCart, PhysicalCopy } = require('../db/models');

module.exports.addItemToCart = async (req, res, next) => {
	try {
		const physicalCopy = await PhysicalCopy.findOne({
			where: {
				itemId: req.body.id,
			},
			raw: true,
		});
		await ShoppingCart.create({
			userId: req.body.userId,
			physicalCopyId: physicalCopy.id,
			quantity: req.body.quantity,
		});
		const result = await ShoppingCart.findAll({
			raw: true,
			where: {
				userId: +req.body.userId,
			},
			include: [
				{
					model: PhysicalCopy,
					attributes: ['itemId', 'color', 'scale', 'price'],
				},
			],
		});
		res.json(result);
	} catch (error) {
		console.log('{{{{addItemToCart}}}}', error);
		next();
	}
};

module.exports.getUsersCartItems = async (req, res, next) => {
	try {
		const { userId } = req.params;
		console.log(userId, '<<<<<<<<<::::');
		const result = await ShoppingCart.findAll({
			raw: true,
			where: {
				userId: +userId,
			},
			include: [
				{
					model: PhysicalCopy,
					attributes: ['itemId', 'color', 'scale', 'price'],
				},
			],
		});
		res.json(result);
	} catch (error) {
		console.log(error, 'cartitems{{{{{{{{{');
	}
};

module.exports.deleteItemCart = async (req, res, next) => {
	try {
		const { userId, itemId } = req.params
		const itemDelete = await ShoppingCart.findOne({ where: { id: itemId, userId: userId } });
		itemDelete.destroy()
		res.sendStatus(200)
	} catch (error) {
		console.log(error, 'deleteItemCart ERROR')
		next()
	}
}

module.exports.plusItemCart = async (req, res, next) => {
	try {
		const { userId, itemId } = req.params;
		const itemPlus = await ShoppingCart.findOne({ where: { id: itemId } });
		itemPlus.set({ quantity: itemPlus.quantity + 1 });
		await itemPlus.save()
		const result = await ShoppingCart.findAll({
			raw: true,
			where: {
				userId: +userId,
			},
			include: [
				{
					model: PhysicalCopy,
					attributes: ['itemId', 'color', 'scale', 'price'],
				},
			],
		});
		res.json(result);
	} catch (error) {
		console.log(error, 'plusItemCart ERROR');
		next();
	}
};

module.exports.minusItemCart = async (req, res, next) => {
	try {
		const { userId, itemId } = req.params;
		const itemPlus = await ShoppingCart.findOne({ where: { id: itemId } });
		if (itemPlus.quantity === 1) {
			const result = await ShoppingCart.findAll({
				raw: true,
				where: {
					userId: +userId,
				},
				include: [
					{
						model: PhysicalCopy,
						attributes: ['itemId', 'color', 'scale', 'price'],
					},
				],
			});
			res.json(result);
		} else {
			itemPlus.set({ quantity: itemPlus.quantity - 1 });
			await itemPlus.save();
			const result = await ShoppingCart.findAll({
				raw: true,
				where: {
					userId: +userId,
				},
				include: [
					{
						model: PhysicalCopy,
						attributes: ['itemId', 'color', 'scale', 'price'],
					},
				],
			});
			res.json(result);
		}
	} catch (error) {
		console.log(error, 'minusItemCart ERROR');
		next();
	}
};

module.exports.addOrderCart = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const orderNumber = Math.floor(Math.random() * 999999);
		const { cartList } = req.body;
		// console.log('cartList[0].id =============', cartList[0].id);
		for (let i = 0; i < cartList.length; i++) {
			const itemOrder = await ShoppingCart.findOne({ where: { id: cartList[i].id } })
			itemOrder.set({ orderNumber: orderNumber });
			await itemOrder.save()
		}
		const result = await ShoppingCart.findAll({
			raw: true,
			where: {
				userId: +userId,
			},
			include: [
				{
					model: PhysicalCopy,
					attributes: ['itemId', 'color', 'scale', 'price'],
				},
			],
		});
		res.json(result);
	} catch (error) {
		console.log(error, 'addOrderCart ERROR');
		next();
	}
};
