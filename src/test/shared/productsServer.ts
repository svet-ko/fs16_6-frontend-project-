import { rest } from "msw";
import { setupServer } from "msw/node";
import productsData from "../data/productsData";
import ProductToCreate from "../../types/ProductToCreate";
import Product from "../../types/Product";
import categoriesData from "../data/categoriesData";
import { BASE_URL } from "../../config/api";
import { jwtFixture } from "../../config/jwtFixture";

export const handlers = [
  rest.get(`${BASE_URL}/products`, async (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const index = productsData.findIndex((p) => p._id === id);
    if (index > -1) {
      return res(ctx.json(productsData[index]));
    } else {
      ctx.status(400);
      return res(ctx.text("No such product"));
    }
  }),

  rest.delete(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (productsData.find((product) => product._id === id)) {
      return res(ctx.json(true));
    } else {
      return res(ctx.json(false));
    }
  }),

  rest.post(`${BASE_URL}/products`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token === jwtFixture.access_token) {
      const input: ProductToCreate = await req.json();
      const category = categoriesData.find(
        (category) => category._id === input.categoryId
      );
      if (category) {
        const newProduct: Product = {
          _id: String(productsData.length + 1),
          title: input.title,
          price: input.price,
          description: input.description,
          images: input.images,
          category: category,
          creationAt: "2023-01-03T16:51:33.000Z",
          updatedAt: "2023-01-03T16:51:33.000Z",
        };
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        return res(
          ctx.json({
            message: [
              "price must be a positive number",
              "images must contain at least 1 elements",
              "each value in images must be a URL address",
              "images must be an array",
            ],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    }
  }),

  rest.put(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token === jwtFixture.access_token) {
      const input: Partial<Product> = await req.json();
      const { id } = req.params;
      const index = productsData.findIndex((p) => p._id === id);
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...productsData[index],
              ...input,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array",
              ],
              error: "Bad Request",
              statusCode: 400,
            })
          );
        }
      } catch (e) {
        console.log("Error happened in PUT request");
      }
    }
  }),
];

const productsServer = setupServer(...handlers);

export default productsServer;
