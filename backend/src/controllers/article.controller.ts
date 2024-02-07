import { Request, Response } from "express";
import { Article } from "../models/article/article.model";
import { ArticleInterface } from '../models/article/article.interface';

export class ArticleController{

    //Afficher tous les artciles du site
    public getAll = async (req: Request, res: Response) => {
        try {
            const allArticle: ArticleInterface[] = await Article.find();
            res.status(200).json({
                message: "status ok! 👍",
                length: allArticle.length,
                response: allArticle
            })
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    //Afficher un article en fonction de id
    public getOne = async (req: Request, res: Response) => {
        try {
            const articleId:number = parseInt(req.params.id)
            const article :ArticleInterface | null = await Article.findById(articleId);
            res.status(200).json({
                message: "status ok! 👍",
                response: article
            })
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    
}