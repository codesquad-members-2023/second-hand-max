import { HTTPSTATUS } from "api/types";

export const successfulUserInfoData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "사용자 정보 조회를 성공하였습니다",
  data: {
    id: 1,
    nickname: "Kakamotobi",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/800px-African_Bush_Elephant.jpg",
  },
};

export const unSuccessfulUserInfoData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "사용자 정보 조회를 실패했습니다",
  data: null,
};

export const successfulUserRegionsData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "나의 동네 목록 조회를 성공하였습니다",
  data: {
    selectedId: 1,
    regions: [
      { id: 1, title: "개포1동" },
      // { id: 2, title: "개포2동" },
    ],
  },
};

export const successfulUserRegionSelectData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "나의 동네 목록 조회를 성공하였습니다",
  data: [
    { id: 1, title: "개포1동" },
    // { id: 2, title: "개포2동" },
  ],
};

export const successfulTransactionItemsData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "판매내역 조회를 성공하였습니다",
  data: {
    hasMore: false,
    items: [
      {
        id: 1,
        title: "잎사귀 포스터",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터를 팝니다. 사실분들께 저렴하게 양도합니다. 포스터 상태는 아주 좋습니다.",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        category: "중고차",
        sellerId: 1,
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 1,
        numLikes: 2,
        numViews: 3,
        isWishlisted: true,
        images: [
          {
            id: 1,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
          {
            id: 2,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
          {
            id: 3,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
        ],
      },
      {
        id: 2,
        title: "잎사귀 포스터2",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터2를 판매합니다. 포스터는 신제품이며, 저렴한 가격에 드립니다.",
        updatedAt: "2023-08-22 10:15:00",
        price: 10000,
        category: "부동산",
        sellerId: 2,
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 0,
        numLikes: 2,
        numViews: 5,
        isWishlisted: false,
        images: [],
      },
    ],
  },
};

export const unsuccessfulTransactionItemsData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "판매내역 조회를 실패하였습니다",
  data: null,
};

export const successfulWishlistItemsData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "관심목록 조회를 성공하였습니다",
  data: {
    hasMore: false,
    items: [
      {
        id: 1,
        title: "잎사귀 포스터",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터를 팝니다. 사실분들께 저렴하게 양도합니다. 포스터 상태는 아주 좋습니다.",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        category: "중고차",
        sellerId: 1,
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 1,
        numLikes: 2,
        numViews: 3,
        isWishlisted: true,
        images: [
          {
            id: 1,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
          {
            id: 2,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
          {
            id: 3,
            url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
          },
        ],
      },
      {
        id: 2,
        title: "잎사귀 포스터2",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터2를 판매합니다. 포스터는 신제품이며, 저렴한 가격에 드립니다.",
        updatedAt: "2023-08-22 10:15:00",
        price: 10000,
        category: "부동산",
        sellerId: 2,
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 0,
        numLikes: 2,
        numViews: 5,
        isWishlisted: false,
        images: [],
      },
    ],
  },
};

export const unsuccessfulWishlistItemsData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "관심목록 조회를 실패하였습니다",
  data: null,
};

export const successfulWishlistItemAdd = {
  code: HTTPSTATUS.created,
  status: "Created",
  message: "관심목록 추가를 성공하였습니다",
  data: null,
};

export const successfulWishlistItemDelete = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "관심목록 삭제를 성공하였습니다",
  data: null,
};
