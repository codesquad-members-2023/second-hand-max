export type getCategoriesResponse = {
  statusCode: number;
  message: string;
  data: {
    categories: {
      id: number;
      imageUrl: string;
      name: string;
    }[];
  };
};
