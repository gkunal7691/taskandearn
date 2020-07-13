import { Address } from "./address";
import { Category } from "./category";
import { User } from "./user";

export class Professional extends User {
    proId: number;
    introduction: string;
    rating: number;
    title: string;
    user: User;
    category: Array<Category>;
    address: Address;
}
