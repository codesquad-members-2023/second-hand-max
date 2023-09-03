import { rest } from 'msw';
import { signResponse } from './data/sign';

export const handlers = [
  rest.post('/auth/naver/signup', (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(signResponse.signUp.success));
  }),

  rest.post('/auth/naver/login', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(signResponse.signIn.success));
  }),
];
