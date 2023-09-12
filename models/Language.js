import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema(
    {
        languageId : {
            type: String,
            required : true
        },
        name: {
            type: String,
            required: true,
        },
    }
);

const Language = mongoose.model("Language", LanguageSchema);
export default Language;
