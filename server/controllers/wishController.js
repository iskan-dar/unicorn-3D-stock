const Models = require('../db/models');

module.exports.getUserWishlist = async (req, res) => {
	try {
		const { userId } = req.params;
		console.log('{{{{getUserWishlist userId}}}}}', userId);
        
		// eslint-disable-next-line use-isnan
		if (userId === 'nan') return res.sendStatus(500);

		const result = await Models.WishList.findAll({ where: { userId: +userId } });
		res.json(result);
	} catch (error) {
		console.log('{{{{getUserWishlist err}}}}}', error);
	}
};

module.exports.addToWishlist = async (req, res) => {
	console.log('req body >>>>>>>>>>>>', req.body);
	try {
		const { userId } = req.params;
		const { itemId } = req.body;
		console.log('{{{{addToWishlist itemId}}}}}', itemId);

		const result = await Models.WishList.create({
			userId: Number(userId),
			itemId: Number(itemId),
		});
		res.json(result);
	} catch (error) {
		console.log('{{{{addToWish err}}}}}', error);
	}
};

module.exports.deleteFromWishlist = async (req, res) => {
	try {
		const { wishId } = req.body;
		await Models.WishList.destroy({ where: { id: wishId } });
		res.sendStatus(200);
	} catch (error) {
		console.log('{{{{DELETE WISH err}}}}}', error);
	}
};
