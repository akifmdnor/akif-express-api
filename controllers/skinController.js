const Skin = require('../models/skins'); // Updated to use the new model

async function getAllSkins(search, reqPage, reqLimit) {
    let options = {};

    if (search) {
        options = {
            ...options,
            $or: [
                {skinName: new RegExp(search.toString(), 'i')},
                {skinDescription: new RegExp(search.toString(), 'i')}
            ]
        }
    }

    let totalPromise = Skin.countDocuments(options); // This is a promise
    let total = await totalPromise; // Await the promise once and store the result

    let page = parseInt(reqPage) || 1;
    let limit = parseInt(reqLimit) || total; // Use the result here
    let last_page = Math.ceil(total / limit); // And here
    if (last_page < 1 && total > 0) {
        last_page = 1;
    }

    try {
        const skins = await Skin.find(options).skip((page - 1) * limit).limit(limit);
        return {
            success: true,
            data: skins,
            total: total.toString(), // Use the variable directly
            page: page.toString(), // No need to await these
            last_page: last_page.toString(), // No need to await these
        };
    } catch (err) {
        return { success: false, message: "Skins not found" };
    }
}

async function getSkinById(id) {
    let skin;
    try {
        skin = await Skin.findById(id);
        if (skin == null) {
            return { success: false, message: 'Cannot find skin' };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }

    return {
        success: true,
        data: skin,
    };
}

async function addSkin(body) {
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

async function updateSkin(id, skinName = null, skinPrice = null, skinDescription = null, skinImageUrl = null) {
    let skin;
    try {
        skin = await Skin.findById(id);
        if (skin == null) {
            return { success: false, message: 'Cannot find skin' };
        }
        if (skinName != null) {
            skin.skinName = skinName
        }
        if (skinPrice != null) {
            skin.skinPrice = skinPrice
        }
        if (skinDescription != null) {
            skin.skinDescription = skinDescription
        }
        if (skinImageUrl != null) {
            skin.skinImageUrl = skinImageUrl
        }

        try {
            const updatedSkin = await skin.save()
            return {
                success: true,
                data: updatedSkin,
                message: "Skin updated successfully"
            };
        } catch (err) {
            return { success: false, message: "Failed to update skin" };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

async function removeSkin(id) {
    let skin;
    try {
        skin = await Skin.findById(id);
        if (skin == null) {
            return { success: false, message: 'Cannot find skin' };
        }

        try {
            await skin.remove()
            return {
                success: true,
                message: 'Deleted Skin'
            };
        } catch (err) {
            return { success: false, message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

module.exports = {
    getAllSkins,
    getSkinById,
    addSkin,
    updateSkin,
    removeSkin
}
