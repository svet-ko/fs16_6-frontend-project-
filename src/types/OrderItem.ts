import Product from "./Product";

interface OrderItem {
  _id: string,
  productId: Product,
  quantity: number
}

export default OrderItem;