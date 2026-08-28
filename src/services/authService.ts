import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { comparePassword } from '../security/hash';

const userRepository = new UserRepository();

export class AuthService {
    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            const err: any = new Error('Email ou mot de passe incorrect');
            err.status = 401;
            throw err;
        }

        if (!user.is_active) {
            const err: any = new Error('Ce compte a été désactivé');
            err.status = 403;
            throw err;
        }

        const validPassword = await comparePassword(password, user.password_hash);
        if (!validPassword) {
            const err: any = new Error('Email ou mot de passe incorrect');
            err.status = 401;
            throw err;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '8h' }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}