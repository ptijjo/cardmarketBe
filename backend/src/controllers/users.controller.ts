import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { v4 as uuid } from 'uuid';
import { sendMailForgetPassword } from '../email/user/user.mail';
import { UserService } from '@services/users.service';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET_KEY, EXPIRED_TOKEN } from '@config';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public connectUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;
      const connectUser: User = await this.user.connectUser(userData);

      //Creation du token d'authentification

      const token = jsonwebtoken.sign(
        {
          userId: connectUser.id,
          userEmail: connectUser.email,
          userFirstName: connectUser.first_name,
          userLastName: connectUser.last_name,
          userRole: connectUser.role,
          userLastConnection: connectUser.last_connection,
        },
        SECRET_KEY as string,
        { expiresIn: EXPIRED_TOKEN as string },
      );

      res.status(200).json({ data: connectUser, token: token, message: 'connected' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUserPassword(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUserRole(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public decodageToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = req.body.token;
      const decodedToken: any = jsonwebtoken.verify(token, SECRET_KEY as string);
      const userId = decodedToken.userId;
      const userLastName = decodedToken.userLastName;
      const userFirstName = decodedToken.userFirstName;
      const userEmail = decodedToken.userEmail;
      const userRole = decodedToken.userRole;

      res.status(200).json({ userLastName, userFirstName, userId, userRole, userEmail });
    } catch (error) {
      next(error);
    }
  };

  //Génération du lien de réinitailisation mdp
  public generationLienMdp = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(400).json({
        message: 'status fail! 🤯',
        response: error,
      });
    }
  };

  //Rénitialisation du mot de passe
  public resetMdp = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(400).json({
        message: 'status fail! 🤯',
        response: error,
      });
    }
  };
}
