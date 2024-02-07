/**
 * @UserRoute est une classe qui définira toutes les routes possibles pour nos utilisateurs et qui héritera de l'interface Route
 * cette classe nous permettra d'utiliser les CRUD pour un utilisateur
 */

import { Router } from "express";
import { Route } from ".";
import { userController } from "../controllers/user.controller";
import { auth } from "../middleware/auth";


export class UserRoute implements Route{
    path = "/users";
    router = Router();
    userCtrl = new userController();

    constructor(){
        this.router
            .post(`${this.path}`, this.userCtrl.newUser) //Creation d'un nouvel utilisateur
            .post(`${this.path}/connection`, this.userCtrl.connectionUser) // Connection d'un utilisateur
            .put(`${this.path}/:id`,auth,) //Modification des données utilisateur
            //.delete(`${this.path}/:id`,auth,this.userCtrl.deleteUser) //Supression utilisateur
    }
}