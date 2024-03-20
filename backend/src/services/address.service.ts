/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateAddressDto } from '@dtos/address.dto';
import { HttpException } from '@/exceptions/httpException';
import { Address } from '@interfaces/address.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class AddressService {
  public address = new PrismaClient().address;
  public date = localDate();

  public async createAddress(userId: number, addressData: CreateAddressDto): Promise<Address> {
    if (!userId) throw new HttpException(401, 'Authorization is missing !');

    const createAddress: Address = await this.address.create({
      data: {
        ...addressData,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return createAddress;
  }

  public async deleteAddress(addressId: number): Promise<Address> {
    const deleteAddress: Address = await this.address.delete({
      where: {
        id: addressId,
      },
    });
    return deleteAddress;
  }
}
