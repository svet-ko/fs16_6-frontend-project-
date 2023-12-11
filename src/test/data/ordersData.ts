import Order from "../../types/Order";

const ordersData: Order[] = [
  {
    _id: "1",
    userId: "1",
    totalPrice: 230,
    items: [{
      _id: "1",
      productId: {
        _id: "1",
        title: "yuuu",
        price: 105,
        description: "A very powerful computer",
        images: ["https://i.imgur.com/PK1WFTJ.jpeg"],
        category: {
          _id: "16",
          name: "Electronics",
          image: "https://i.imgur.com/F1XLwX4.jpeg",
        },
      },
      quantity: 1
    }]
  }
];

export default ordersData;