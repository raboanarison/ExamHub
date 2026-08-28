import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        console.log("LOGIN REQUEST:", req.body);

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email et mot de passe requis'
                });
            }

            const result = await authService.login(email, password);

            return res.json(result);
        } catch (error: any) {
            console.error("LOGIN ERROR:", error);

            const status = error.status || 500;

            return res.status(status).json({
                message: error.message || 'Erreur interne'
            });
        }
    }
}