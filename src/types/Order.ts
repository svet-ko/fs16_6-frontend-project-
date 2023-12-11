import OrderItem from "./OrderItem";

type Order = {
  _id: string,
  userId: string,
  totalPrice: number,
  items: OrderItem[]
}

export default Order;