import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { ConnectUserDto, CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { admin } from '@/middlewares/admin';
import { modo } from '@/middlewares/modo';
import { auth } from '@/middlewares/auth';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, modo, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, modo, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.post(`${this.path}/connection`, ValidationMiddleware(ConnectUserDto), this.user.connectUser);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto, true), auth, this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, admin, this.user.deleteUser);
    this.router.put(`${this.path}/role/:id(\\d+)`, admin, this.user.updateRole);

    this.router.post(`${this.path}/decodage`, this.user.decodageToken); // Décodage du token

    this.router.post(`${this.path}/forget-password`, auth, this.user.generationLienMdp); // Génération du lien de réinitailisation mdp
    this.router.post(`${this.path}/reset-password`, auth, this.user.resetMdp); // Envoi du mail pour réinitialiser le mdp
  }
}
