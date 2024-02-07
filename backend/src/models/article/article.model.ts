import mongoose from "mongoose";
import { ArticleInterface } from "./article.interface";

const UserSchema = new mongoose.Schema<ArticleInterface>({

    titre: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    prix: {
        type: Number,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
        enum:["Pokémon", "Dragon Ball", "One Peace"]
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum:["published", "not published"]
    },

});


export const Article = mongoose.model("Article", UserSchema);