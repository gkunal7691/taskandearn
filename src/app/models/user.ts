import { Professional } from "./professional";
export class User {
    userId?: number;
    email: string;
    firstName: string;
    lastName: string;
    password:string;
    lastLogin?: number;
    professional?: Professional;
}
