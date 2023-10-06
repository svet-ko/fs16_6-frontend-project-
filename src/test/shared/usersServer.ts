import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { BASE_URL } from '../../config/api';
import usersData from '../data/usersData';

export const accessToken = "my-access-token";

export const handlers = [
  rest.get(`${BASE_URL}/users`, async (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),

  rest.post(`${BASE_URL}/auth/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = usersData.find(user => user.email === email && user.password === password);
    if (foundUser) {
      const token = accessToken + '_' + foundUser.id
      return res(ctx.json({ access_token: token }))
    }
  }),

  rest.get(`${BASE_URL}/auth/profile`, async (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const originalToken = token?.split('_')[0];
    const userId = token?.split('_')[1];
    const foundUser = usersData.find(user => user.id === Number(userId));
    if (originalToken === accessToken && foundUser) {
      return res(ctx.json(foundUser));
    } else {
      ctx.status(401);
      return res(ctx.text('Request failed with status code 401'));
    }
  })
];

const usersServer = setupServer(...handlers);

export default usersServer;