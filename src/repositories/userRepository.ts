import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { Repository } from "typeorm";

export const getUserRepository = (): Repository<User> => AppDataSource.getRepository(User);
