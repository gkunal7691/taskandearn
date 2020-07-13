import { Subcategory } from "./subcategory";
export class Category {
    categoryId: number;
    imagePath: string;
    categoryName: string;
    description: string;
    subCategories: Array<Subcategory>;
}
