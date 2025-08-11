import { getUserRepository } from '../repositories/userRepository';
import { User } from '../entity/user';
import { hashPassword, comparePassword } from '../utils/hash';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';


const repo = (): Repository<User> => getUserRepository();

export const userService = {
  async createEmployee(data: { name: string; email: string; password: string; role?: 'EMPLOYEE' | 'HR' }) {
    const r = repo();
    const existing = await r.findOne({ where: { email: data.email } });
    if (existing) throw { status: 400, message: 'Email já cadastrado' };

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = await hashPassword(data.password);
    user.role = data.role ?? 'EMPLOYEE';

    return r.save(user);
  },

  async findByEmail(email: string) {
    return repo().findOne({ where: { email } });
  },

  async findById(id: string) {
    return repo().findOne({ where: { id } });
  },

  async validateCredentials(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await comparePassword(password, user.password);
    if (!ok) return null;
    return user;
  },

  generateJWT(user: User) {
    const secret = process.env.JWT_SECRET || 'changeme';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    return jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn });
  },
};