/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { CategoryController } from '@controllers/category.controller';
import { CreateCategoryDto } from '@dtos/category.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { admin } from '@/middlewares/admin';

export class AddressRoute implements Routes {
  public path = '/category';
  public router = Router();
  public address = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,);
    this.router.get(`${this.path}/:id(\\d+)`,);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateCategoryDto), admin, );
    //this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateAddressDto, true));
    this.router.delete(`${this.path}/:id(\\d+)`, admin,);
  }
}
