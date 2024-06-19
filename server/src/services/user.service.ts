import { Users } from "@prisma/client";
import { UserRegisterDTO } from "../dtos/user.dto";
import { prisma } from "../..";
import { IUserDetails } from "../interfaces/user.interfaces";

class UserService {
  //For getting all users
  getUserDetails = async (): Promise<IUserDetails[]> => {
    const userDetails = await prisma.users.findMany({
      select: {
        userId: true,
        name: true,
        email: true,
        picture: true,
        phoneNumber: true,
      },
    });

    return userDetails;
    // if (userDetails.length > 0) return userDetails;

    // return null;
  };

  //For registration of the user
  registerUser = async (userDTO: UserRegisterDTO): Promise<boolean> => {
    const user = await prisma.users.create({
      data: userDTO,
    });

    return !!user;
  };

  //Getting user by Id
  getUserById = async (id: string): Promise<Users | null> => {
    const user = await prisma.users.findFirst({ where: { userId: id } });

    return user;
  };

  //Getting user by email
  getUserByEmail = async (email: string): Promise<Users | null> => {
    const user = await prisma.users.findFirst({ where: { email: email } });

    return user;
  };
}

export const userService = new UserService();
