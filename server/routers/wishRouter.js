const wishRouter = require('express').Router();
const { getUserWishlist, addToWishlist, deleteFromWishlist } = require('../controllers/wishController');

wishRouter
	.get('/:userId', getUserWishlist)
	.post('/:userId/new', addToWishlist)
	.post('/delete', deleteFromWishlist);

module.exports = wishRouter;
