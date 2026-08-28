import { StudentRepository } from '../repositories/studentRepository';
import bcrypt from 'bcrypt';

export class StudentService {
  static async getAllStudents() {
    return await StudentRepository.findAll();
  }

  static async createStudent(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await StudentRepository.create(data.email, hashedPassword);
  }

  static async updateStudent(id: string, data: any) {
    return await StudentRepository.update(id, data.email);
  }

  static async deactivateStudent(id: string) {
    return await StudentRepository.softDelete(id);
  }
}