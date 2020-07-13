import { Address } from "./address";
import { Category } from "./category";
export class Tasks {
    taskId: number;
    title: string;
    description: string;
    price: number;
    address: Address;
    categories: Array<Category>;
}
