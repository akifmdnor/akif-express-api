import express, { Request, Response } from 'express';
import skinController from '../controllers/skinController';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const response = await skinController.getAllSkins(req.query.s as string, req.query.page as string, req.query.limit as string);
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const response = await skinController.getSkinById(req.params.id);
    res.json(response);
});

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

router.put('/:id', async (req: Request, res: Response) => {
    const { skinName, skinPrice, skinDescription, skinImageUrl } = req.body;
    const response = await skinController.updateSkin(req.params.id, skinName, skinPrice, skinDescription, skinImageUrl);

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const response = await skinController.removeSkin(req.params.id);
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
