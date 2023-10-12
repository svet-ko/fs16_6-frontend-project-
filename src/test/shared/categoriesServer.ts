import { rest } from 'msw'
import { setupServer } from 'msw/node'

import categoriesData from "../data/categoriesData";
import { BASE_URL } from '../../config/api';

export const handlers = [
  rest.get(`${BASE_URL}/categories`, async (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
];

const categoriesServer = setupServer(...handlers);

export default categoriesServer;