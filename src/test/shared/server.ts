import { rest } from 'msw'
import { setupServer } from 'msw/node'
import products from '../data/productsData'

export const handlers = [
  rest.delete("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
    const { id } = req.params;
    if (products.find(product => product.id === Number(id))) {
        return res(
          ctx.json(true)
        )
    } else {
        return res(
          ctx.json(false)
        )
    }
  }),

  rest.post("https://api.escuelajs.co/api/v1/products/", async (req, res, ctx) => {
    const data = req.bodyUsed;
    console.log(data);
    
  })
];

const server = setupServer(...handlers);

export default server;