/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Address } from '@interfaces/address.interface';
import { AddressService } from '@services/address.service';

export class AddressController {
  public address = Container.get(AddressService);

  public createAddress = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addressData: Address = req.body;
      const userId = req.auth.userId;
 
      const createAddressData: Address = await this.address.createAddress(userId, addressData);

      res.status(201).json({ data: createAddressData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addressId = Number(req.params.id);
      const deleteAddress = await this.address.deleteAddress(addressId);
      res.status(200).json({ data: deleteAddress, message: 'deleted' });
    } catch (error) {
      next(error)
    }
  }
}
