import mongoose, { Schema, Document } from "mongoose";

interface ISkin extends Document {
    skinName: string;
    skinPrice: number;
    skinDescription: string;
    skinImageUrl: string;
}

const skinSchema: Schema = new Schema({
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

const Skins = mongoose.model<ISkin>('Skins', skinSchema);

export default Skins;
