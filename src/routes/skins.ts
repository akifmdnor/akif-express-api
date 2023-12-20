import express, { Request, Response } from 'express';
import skinController from '../controllers/skinController';


const router = express.Router();
/**
 * @swagger
 * /skins:
 *   get:
 *     description: Get all skins
 *     responses:
 *       200:
 *         description: Returns all skins
 */
router.get('/', async (req: Request, res: Response) => {
    const response = await skinController.getAllSkins(req.query.s as string, req.query.page as string, req.query.limit as string);
    if (response.success) {
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
router.get('/:id', async (req: Request, res: Response) => {
    const response = await skinController.getSkinById(req.params.id);
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
router.post('/', async (req: Request, res: Response) => {
    const body = {
        skinName: req.body.skinName,
        skinPrice: req.body.skinPrice,
        skinDescription: req.body.skinDescription,
        skinImageUrl: req.body.skinImageUrl,
    };
    const response = await skinController.addSkin(body);

    if (response.success) {
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
router.put('/:id', async (req: Request, res: Response) => {
    const { skinName, skinPrice, skinDescription, skinImageUrl } = req.body;
    const response = await skinController.updateSkin(req.params.id, skinName, skinPrice, skinDescription, skinImageUrl);

    if (response.success) {
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
router.delete('/:id', async (req: Request, res: Response) => {
    const response = await skinController.removeSkin(req.params.id);
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
