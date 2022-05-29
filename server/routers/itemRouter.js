const router = require('express').Router();
const { addItem, getOneItem, getAllItems } = require('../controllers/itemController');
const fs = require('fs')

router.get('/:id', getOneItem);
router.get('/', getAllItems);
router.post('/new', addItem);

router.post("/stl", (req, res) => {
    const stlName = req.body.stlPath
    const stl = fs.readFileSync(`./static/previewStl/${stlName}`, null);
    res.end(stl);
  });

module.exports = router;
