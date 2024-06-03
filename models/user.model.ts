export interface UserModel {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: "public"| "admin" | "user";
    createdAt: Date;
    updatedAt?: Date;
    
}