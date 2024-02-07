import { Router } from "express";
import { Route } from ".";
import { auth } from "../middleware/auth";
import { ArticleController } from "../controllers/article.controller";

export class ArticleRoute implements Route{
    path="/articles";
    router = Router();
    articleCtrl = new ArticleController();
    
    constructor() {
        this.router
            .get(`${this.path}`, auth,this.articleCtrl.getAll)
            .get(`${this.path}/:id`, auth,this.articleCtrl.getOne)
            .post(`${this.path}`, auth)
            .put(`${this.path}/:id`, auth)
            .delete(`${this.path}/:id`, auth)
            
    }
    
}