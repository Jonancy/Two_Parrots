import { Users } from "@prisma/client";
import { UserRegisterDTO } from "../dtos/user.dto";
import { prisma } from "../..";
import { IUserDetails } from "../interfaces/user.interfaces";


class UserService {
  //For getting all users
  getUserDetails = async (): Promise<IUserDetails[]> => {
    const userDetails = await prisma.users.findMany({
      select: { id: true, name: true, email: true, picture: true },
    });

    return userDetails.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    }));
  };

  //For registration of the user
  registerUser = async (userDTO: UserRegisterDTO): Promise<boolean> => {
    const userDetails = await prisma.users.create({
      data: userDTO,
    });

    if (userDetails) {
      return true;
    }

    return false;
  };

  //Getting user by Id
  getUserById = async (id: string): Promise<Users> => {
    const user = await prisma.users.findFirst({ where: { id: id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  //Getting user by email
  getUserByEmail = async (email: string): Promise<Users> => {
    const user = await prisma.users.findFirst({ where: { email: email } });

    if (user) {
      return user;
    } else {
      return null;
    }
  };

}

export const userService = new UserService();
