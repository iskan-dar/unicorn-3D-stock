const router = require('express').Router();
const { addItemToCart, getUsersCartItems, deleteItemCart, plusItemCart, minusItemCart, addOrderCart} = require('../controllers/cartController');

router
	.post('/new', addItemToCart)
	.get('/:userId', getUsersCartItems)
	.post('/:userId/:itemId', deleteItemCart )
	.post('/:userId/:itemId/plus', plusItemCart )
	.post('/:userId/:itemId/minus', minusItemCart )
	.post('/:userId/addOrder', addOrderCart);

module.exports = router;
