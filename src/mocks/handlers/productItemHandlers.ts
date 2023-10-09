import { HTTPSTATUS } from "api/types";
import {
  successfulProductItemsData,
  unSuccessfulProductItemsData,
} from "mocks/data/productItemData";
import { rest } from "msw";

export default [
  rest.get("/api/items", async (req, res, ctx) => {
    const region = req.url.searchParams.get("region");
    const category = req.url.searchParams.get("category");
    const page = req.url.searchParams.get("page");
    const size = req.url.searchParams.get("size");

    if (region && category && page && size) {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulProductItemsData)
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unSuccessfulProductItemsData)
      );
    }
  }),

  rest.get("/api/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const item = successfulProductItemsData.data.items.find(
      (product) => product.id === Number(id)
    );

    if (item) {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json({
          ...successfulProductItemsData,
          data: item,
        })
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.notFound),
        ctx.json({
          code: HTTPSTATUS.notFound,
          status: "Not Found",
          message: "상품을 찾을 수 없습니다",
          data: null,
        })
      );
    }
  }),
];
