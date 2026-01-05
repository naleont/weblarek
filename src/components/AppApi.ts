import { IApi, IOrder, IOrderResponse, IProduct, IProductsResponse } from "../types";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._baseApi
            .get<IProductsResponse>("/product/")
            .then((productResponse: IProductsResponse) => productResponse);
    }

    postBuyer(data: IOrder): Promise<IOrderResponse> {
        return this._baseApi
            .post<IOrderResponse>("/order/", data)
            .then((res: IOrderResponse) => res);
    }
}
