const {ShoppingCart, PhysicalCopy} = require("../db/models");
const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {

        const result = await ShoppingCart.findAll({
            raw: true,
            include: [
                {
                    model: PhysicalCopy,
                    attributes: ['itemId', 'color', 'scale', 'price'],
                },
            ],
        });

        console.log('===========================', result)
        res.json(result);
    } catch (error) {
        console.log(error, 'FALL ORDERS MAKER ROUT');
    }
})

module.exports = router;