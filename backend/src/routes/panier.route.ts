import { Router } from "express";
import { Route } from ".";
import { auth } from "../middleware/auth";


export class ArticleRoute implements Route{
    path="/articles";
    router = Router();
    //articleCtrl = new ArticleController();
    
    constructor() {
        this.router
            .get(`${this.path}`, auth)
            .post(`${this.path}`, auth)
            .put(`${this.path}/:id`, auth)
            .delete(`${this.path}/:id`, auth)
            
    }
    
}