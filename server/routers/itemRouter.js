const router = require('express').Router();
const { addItem, getOneItem, getAllItems } = require('../controllers/itemController');

router.get('/:id', getOneItem);
router.get('/', getAllItems);
router.post('/new', addItem);

module.exports = router;
