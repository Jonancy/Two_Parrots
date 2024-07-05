export interface IApiResponse<T> {
  success: boolean;
  messsage: string;
  data: T;
}
