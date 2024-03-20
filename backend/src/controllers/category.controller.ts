/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Category } from '@interfaces/category.interface';
import { CategoryService } from '@services/category.service';

export class CategoryController {
    public address = Container.get(CategoryService);
}