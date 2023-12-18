const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const skinSchema = new Schema({
    skinName: {
        type: String,
    },
    skinPrice: {
        type: Number,
    },
    skinDescription: {
        type: String,
    },
    skinImageUrl: {
        type: String,
    },
});

const Skins = mongoose.model('Skins', skinSchema);

module.exports = Skins;