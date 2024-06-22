export interface ICategoryDTO {
  categoryName: string;
}

export interface IProductDTO {
  name: string;
  description: string;
  price: string;
  gender: "Men" | "Women";
  categoryId: string;
}
