/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { AddressController } from '@controllers/address.controller';
import { CreateAddressDto } from '@dtos/address.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { auth } from '@/middlewares/auth';

export class AddressRoute implements Routes {
  public path = '/address';
  public router = Router();
  public address = new AddressController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, auth);
    this.router.get(`${this.path}/:id(\\d+)`, auth);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateAddressDto), auth, this.address.createAddress);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateAddressDto, true));
    this.router.delete(`${this.path}/:id(\\d+)`, auth,this.address.deleteAddress);
  }
}
