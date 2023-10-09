import { HTTPSTATUS } from "api/types";
import {
  successfulRefreshAccessToken,
  successfulSignInData,
  successfulSignOutData,
  successfulSignUpData,
  unSuccessfulRefreshAccessToken,
  unSuccessfulSignInData,
  unSuccessfulSignUpData,
} from "mocks/data/authData";
import { rest } from "msw";

export default [
  rest.post("/api/users/signup", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unSuccessfulSignUpData)
    );
    return res(ctx.status(HTTPSTATUS.created), ctx.json(successfulSignUpData));
  }),

  rest.post("/api/auth", async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === "d@d.com" && password === "hello123!") {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulSignInData)
      );
    }
    return res(
      ctx.status(HTTPSTATUS.unAuthorized),
      ctx.json(unSuccessfulSignInData)
    );
  }),

  rest.get("/api/auth/oauth/kakao", async (req, res, ctx) => {
    const code = req.url.searchParams.get("code");

    if (code) {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulSignInData)
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.unAuthorized),
        ctx.json(unSuccessfulSignInData)
      );
    }
  }),

  rest.delete("/api/auth", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.success), ctx.json(successfulSignOutData));
  }),

  rest.get("/api/auth/refresh", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.unAuthorized),
      ctx.json(unSuccessfulRefreshAccessToken)
    );
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulRefreshAccessToken)
    );
  }),
];
