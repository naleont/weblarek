import { AppApi } from "./components/AppApi";
import { Api } from "./components/base/Api";
// import { Cart } from "./components/Models/Cart";
import { Catalogue } from "./components/Models/Catalogue";
import "./scss/styles.scss";
import { IApi } from "./types";
import { API_URL, settings } from "./utils/constants";

const productsModel = new Catalogue();
// const cartModel = new Cart();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

Promise.all([api.getProducts()])
    .then(([products]) => {
        productsModel.items = products;
        // console.log(productsModel.items);
    })
    .catch((err) => {
        console.error(err);
    });
