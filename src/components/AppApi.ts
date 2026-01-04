import { IApi, IOrder, IOrderResponse, IProduct } from "../types";

export class AppApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProduct[]> {
        return this._baseApi
            .get<IProduct[]>("/product/")
            .then((products: IProduct[]) => products);
    }

    postBuyer(data: IOrder): Promise<IOrderResponse> {
        return this._baseApi
            .post<IOrderResponse>("/order/", data)
            .then((res: IOrderResponse) => res);
    }
}
