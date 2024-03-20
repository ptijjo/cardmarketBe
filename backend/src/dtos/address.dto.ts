/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  @IsNotEmpty()
  public number: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  public street: string;

  @IsNumber()
  @IsNotEmpty()
  public postalCode: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  public city: string;
}
