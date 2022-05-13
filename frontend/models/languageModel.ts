import { Schema, model, models } from 'mongoose';

const languageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    words: {
        type: [String],
        required: true,
    },
});

const Language = models.Language || model('Language', languageSchema);

export default Language;
