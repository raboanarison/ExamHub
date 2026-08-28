export type UserRole = 'admin' | 'student';

export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    is_active: boolean;
}

export interface SafeUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    is_active: boolean;
}