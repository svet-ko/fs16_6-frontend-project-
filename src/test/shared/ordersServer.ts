import { rest } from "msw";
import { setupServer } from "msw/node";

import { BASE_URL } from "../../config/api";
import Order from "../../types/User";
import { jwtFixture } from "../../config/jwtFixture";
import ordersData from "../data/ordersData";
import usersData from "../data/usersData";
import productsData from "../data/productsData";
import OrderItem from "../../types/OrderItem";

export const handlers = [
  rest.get(`${BASE_URL}/orders`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token === jwtFixture.access_token) {
      return res(ctx.json(ordersData));
    } else {
      ctx.status(403);
      return res(ctx.text("Access forbidden"));
    }
  }),

  rest.post(`${BASE_URL}/orders/checkout/:id`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token === jwtFixture.access_token) {
      const { id } = req.params;
      const foundUser = usersData.find(
        (user) => user._id === id
      );
      if (foundUser) {
        const order: OrderItem[] = await req.json();
        let totalPrice = 0;
        order.forEach((orderItem) => {
          const orderItemPrice = productsData.reduce((acc, product) => {
            if (product._id === orderItem.productId._id) {
              return acc += product.price;
            }
            return acc;
          }, 0)
          totalPrice += orderItemPrice*orderItem.quantity;
        })
        return res(
          ctx.json({_id: ordersData.length+1+'', totalPrice})
        );
      } else {
        ctx.status(404);
        return res(ctx.text("Route not found"));
      }
    } else {
      ctx.status(403);
      return res(ctx.text("Access forbidden"));
    }
  }),

  rest.get(`${BASE_URL}/user/:id`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token === jwtFixture.access_token) {
      const { id } = req.params;
      const ordersByUserId = ordersData.filter((order) => order.userId === id);
      return res(ctx.json(ordersByUserId));
    } else {
      ctx.status(403);
      return res(ctx.text("Access forbidden"));
    }
  })
  
];
  
  const ordersServer = setupServer(...handlers);
  
  export default ordersServer;