import mongoose from "mongoose";
import { ArticleInterface } from "./article.interface";
import validator from "validator";

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
    slug: {
        type: String,
        validate(v: any) {
            if (!validator.isSlug(v)) throw new Error("Ceci n'est pas un slug");
        }
    }

});


export const Article = mongoose.model("Article", UserSchema);