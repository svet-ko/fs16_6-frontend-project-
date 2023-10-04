import { rest } from 'msw'
import { setupServer } from 'msw/node'
import productsData from '../data/productsData'
import ProductToCreate from '../../types/ProductToCreate';
import Product from '../../types/Product';
import categories from '../data/categories';
import { BASE_URL } from '../../config/api';

export const handlers = [
  rest.delete(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (productsData.find(product => product.id === Number(id))) {
        return res(
          ctx.json(true)
        )
    } else {
        return res(
          ctx.json(false)
        )
    }
  }),

  rest.post(`${BASE_URL}/products`, async (req, res, ctx) => {
    const input: ProductToCreate = await req.json();
    const category = categories.find(category => category.id === input.categoryId);
    if (category) {
      const newProduct: Product = {
        id: productsData.length + 1,
        title: input.title,
        price: input.price,
        description: input.description,
        images: input.images,
        category: category,
        creationAt: "2023-01-03T16:51:33.000Z",
        updatedAt: "2023-01-03T16:51:33.000Z",
      }
      return res(ctx.json(newProduct));
    } else {
        ctx.status(400)
        return res(ctx.json({
            message: [
                "price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array"
            ],
            error: "Bad Request",
            statusCode: 400
        }))
    }
  }),

  rest.put(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const input: Partial<Product> = await req.json();
    const { id } = req.params;
    const index = productsData.findIndex(p => p.id === Number(id))
    try {
      if (index > -1) {
        return res(ctx.json({
          ...productsData[index],
          ...input
        }))
      } else {
          ctx.status(400)
          return res(ctx.json(
              {
                  message: [
                      "price must be a positive number",
                      "images must contain at least 1 elements",
                      "each value in images must be a URL address",
                      "images must be an array"
                  ],
                  error: "Bad Request",
                  statusCode: 400
              }
          ))
      }
    } catch (e) {
      console.log("Error happened in PUT request")
    }
  })
];

const server = setupServer(...handlers);

export default server;