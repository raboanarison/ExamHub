import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: number; role: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Non authentifié' });
    }
    try {
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
}

export function requireRole(role: 'admin' | 'student') {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
}