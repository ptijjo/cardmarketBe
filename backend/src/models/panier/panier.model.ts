import mongoose from "mongoose";
import { Article } from "../article/article.model";

const PanierSchema = new mongoose.Schema({
    panier: [Article]
});

export const Panier = mongoose.model("Panier", PanierSchema);