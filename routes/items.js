const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require('../fakeDb')

//route to get all items
router.get('/', function (req, res) {
    res.json({ items });
})

//route to create a new item, add name + price
router.post('/', function (req, res, next) {
    try {
        if (!req.body.name) throw new ExpressError("Missing data", 400);
        const newItem = { name: req.body.name, price: req.body.price }
        items.push(newItem);
        return res.status(201).json({ added: newItem })
    } catch (e) {
        return next(e);
    }
})

//route to get an item
router.get('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        //testing if item exist
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        res.json(foundItem)
    } catch (e) {
        return next(e);
    }
});

//route to change name or price of item
router.patch('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        res.json({ updated: foundItem });
    } catch (e) {
        return next(e);
    }
});

//route to delete item
router.delete('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        items.splice(foundItem, 1);
        res.json({ message: "Deleted" });
    } catch (e) {
        return next(e);
    }
})

module.exports = router;