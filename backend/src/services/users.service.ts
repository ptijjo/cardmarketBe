import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { ConnectUserDto, CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany({
      include: {
        adress: {
          select: {
            id: true,
            number: true,
            street: true,
            postalCode: true,
            city: true,
          },
        },
        commande: {
          select: {
            id: true,
            card: true,
            booster: true,
            starter: true,
            Createad_at: true,
          },
        },
        payement: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId }, include: { adress: true, commande: true, payement: true } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.user.create({
      data: { ...userData, password: hashedPassword, created_at: localDate() },
    });
    return createUserData;
  }

  public async connectUser(userData: ConnectUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const updateUser = await this.user.update({
      where: {
        email: findUser.email,
      },
      data: {
        last_connection: localDate(),
      },
    });

    return updateUser;
  }

  public async updateUserPassword(userId: number, userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData = await this.user.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  public async updateUserRole(userId: number, userData: any): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const choix: string[] = ['MODO', 'USER'];

    if (findUser.role === 'ADMIN') throw new HttpException(401, 'Acces denied !');

    if (!choix.includes(userData.role)) throw new HttpException(400, "This role doesn't exist");

    const updateUserData: User = await this.user.update({ where: { id: findUser.id }, data: { role: userData.role } });
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    if (findUser.role === 'ADMIN') throw new HttpException(401, 'Acces denied !');

    const deleteUserData = await this.user.delete({ where: { id: findUser.id } });
    return deleteUserData;
  }
}
