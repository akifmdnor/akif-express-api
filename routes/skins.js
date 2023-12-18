const express = require('express');
const router = express.Router();
let { getAllSkins, getSkinById, addSkin, updateSkin, removeSkin } = require('../controllers/skinController')

/**
 * @swagger
 * /skins:
 *   get:
 *     description: Get all skins
 *     responses:
 *       200:
 *         description: Returns all skins
 */
router.get('/', async (req, res) => {
    let response = await getAllSkins(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /skins/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The skin ID.
 *     description: Get a skin by id
 *     responses:
 *       200:
 *         description: Returns the requested skin
 */
router.get('/:id', async (req, res) => {
    let response = await getSkinById(req.params.id);
    res.json(response);
});

/**
 * @swagger
 * /skins:
 *   post:
 *     parameters:
 *      - in: body
 *        name: skin
 *        description: New skin
 *        schema:
 *          type: object
 *          properties:
 *            skinName:
 *              type: string
 *            skinPrice:
 *              type: number
 *            skinDescription:
 *              type: string
 *            skinImageUrl:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
    let body = {
        skinName: req.body.skinName,
        skinPrice: req.body.skinPrice,
        skinDescription: req.body.skinDescription,
        skinImageUrl: req.body.skinImageUrl,
    };
    let response = await addSkin(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /skins/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The skin ID.
 *      - in: body
 *        name: skin
 *        description: Update skin
 *        schema:
 *          type: object
 *          properties:
 *            skinName:
 *              type: string
 *            skinPrice:
 *              type: number
 *            skinDescription:
 *              type: string
 *            skinImageUrl:
 *              type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', async (req, res) => {
    let skinName = req.body.skinName;
    let skinPrice = req.body.skinPrice;
    let skinDescription = req.body.skinDescription;
    let skinImageUrl = req.body.skinImageUrl;

    let response = await updateSkin(req.params.id, skinName, skinPrice, skinDescription, skinImageUrl);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /skins/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The skin ID.
 *     description: Delete a skin by id
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', async (req, res) => {
    let response = await removeSkin(req.params.id);
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = router;
