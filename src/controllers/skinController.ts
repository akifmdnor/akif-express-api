import Skin from '../models/skins';

interface SkinSearchOptions {
  skinName?: RegExp;
  skinDescription?: RegExp;
}

async function getAllSkins(search: string, reqPage: string, reqLimit: string): Promise<any> {
    let options: SkinSearchOptions = {};

    if (search) {
        options = {
            skinName: new RegExp(search.toString(), 'i'),
            skinDescription: new RegExp(search.toString(), 'i')
        };
    }

    const total: number = await Skin.countDocuments(options);

    const page: number = parseInt(reqPage) || 1;
    const limit: number = parseInt(reqLimit) || total;
    const last_page: number = Math.max(Math.ceil(total / limit), total > 0 ? 1 : 0);

    try {
        const skins = await Skin.find(options).skip((page - 1) * limit).limit(limit);
        return {
            success: true,
            data: skins,
            total: total.toString(),
            page: page.toString(),
            last_page: last_page.toString(),
        };
    } catch (err) {
        return { success: false, message: "Skins not found" };
    }
}

async function getSkinById(id: string): Promise<any> {
    try {
        const skin = await Skin.findById(id);
        if (!skin) {
            return { success: false, message: 'Cannot find skin' };
        }

        return {
            success: true,
            data: skin,
        };
    } catch (err) {
        const error = err as Error;
        return { success: false, message: error.message };
    }
}

async function addSkin(body: any): Promise<any> {
    const skin = new Skin(body);

    try {
        const newSkin = await skin.save();
        return {
            success: true,
            data: newSkin,
        };
    } catch (err) {
        return { success: false, message: "Failed to add skin" };
    }
}

async function updateSkin(id: string, skinName: string | null, skinPrice: number | null, skinDescription: string | null, skinImageUrl: string | null): Promise<any> {
    try {
        const skin = await Skin.findById(id);
        if (!skin) {
            return { success: false, message: 'Cannot find skin' };
        }

        if (skinName) skin.skinName = skinName;
        if (skinPrice) skin.skinPrice = skinPrice;
        if (skinDescription) skin.skinDescription = skinDescription;
        if (skinImageUrl) skin.skinImageUrl = skinImageUrl;

        try {
            const updatedSkin = await skin.save();
            return {
                success: true,
                data: updatedSkin,
                message: "Skin updated successfully"
            };
        } catch (err) {
            return { success: false, message: "Failed to update skin" };
        }
    } catch (err) {
        const error = err as Error;
        return { success: false, message: error.message };
    }
}

async function removeSkin(id: string): Promise<any> {
    try {
        const result = await Skin.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return { success: false, message: 'Cannot find skin' };
        }

        return {
            success: true,
            message: 'Deleted Skin'
        };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, message: err.message };
        }
        return { success: false, message: "An unknown error occurred" };
    }
}


export default {
    getAllSkins,
    getSkinById,
    addSkin,
    updateSkin,
    removeSkin
};
