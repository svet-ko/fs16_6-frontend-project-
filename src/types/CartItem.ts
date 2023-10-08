import Product from './Product';

interface CartItem extends Product {
  totalPrice: number,
  quantity: number
}

export default CartItem;