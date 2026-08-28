import { CourseRepository } from '../repositories/courseRepository';

export class CourseService {
  static async getAllCourses() {
    return await CourseRepository.findAll();
  }

  static async getCourseById(id: number) {
    const course = await CourseRepository.findById(id);
    if (!course) {
      throw new Error('COURSE_NOT_FOUND');
    }
    return course;
  }

  static async createCourse(title: string, description: string) {
    if (!title) {
      throw new Error('TITLE_REQUIRED');
    }
    return await CourseRepository.create(title, description);
  }

  static async updateCourse(id: number, title: string, description: string) {
    const course = await CourseRepository.update(id, title, description);
    if (!course) {
      throw new Error('COURSE_NOT_FOUND');
    }
    return course;
  }

  static async deleteCourse(id: number) {
    const course = await CourseRepository.delete(id);
    if (!course) {
      throw new Error('COURSE_NOT_FOUND');
    }
    return course;
  }
}