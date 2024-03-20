/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateCategoryDto } from '@dtos/category.dto';
import { HttpException } from '@/exceptions/httpException';
import { Category } from '@interfaces/category.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class CategoryService {
    public address = new PrismaClient().category;
    public date = localDate();
}