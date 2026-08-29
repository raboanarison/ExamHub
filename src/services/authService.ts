import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { comparePassword } from '../security/hash';

const userRepository = new UserRepository();

export class AuthService {
    async login(email: string, password: string) {

        console.log("EMAIL RECU :", email);

        const user = await userRepository.findByEmail(email);

        console.log("USER TROUVE :", user);

        if (!user) {
            const err: any = new Error('Email ou mot de passe incorrect');
            err.status = 401;
            throw err;
        }

        console.log("HASH BDD :", user.password_hash);

        const validPassword = await comparePassword(
            password,
            user.password_hash
        );

        console.log("MOT DE PASSE VALIDE :", validPassword);

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