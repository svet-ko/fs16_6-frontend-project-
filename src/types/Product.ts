import Category from "./Category";

type Product = {
    _id: string,
    title: string,
    price: number,
    description: string,
    category: Category,
    images: string[],
    creationAt?: string,
    updatedAt?: string,
}
 
export default Product;