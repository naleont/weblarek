import { AppApi } from "./components/AppApi";
import { Api } from "./components/base/Api";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { Catalogue } from "./components/Models/Catalogue";
import "./scss/styles.scss";
import { IApi } from "./types";
import { API_URL, settings } from "./utils/constants";
import { apiProducts } from "./utils/data";

const productsModel = new Catalogue();
const cartModel = new Cart();
const buyerModel = new Buyer();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

// Проверка работы методов на данных из apiProducts
// Catalogue
productsModel.items = apiProducts.items;
console.log("Список товаров в каталоге: ", productsModel.items);
productsModel.itemActive = productsModel.items[0];
console.log("Выбранный для отображения товар: ", productsModel.itemActive);
console.log(
    "Товар, выбранный по ID: ",
    productsModel.getItem("854cef69-976d-4c2a-a18c-2aa45046c390")
);
// Cart
cartModel.add(productsModel.itemActive);
productsModel.itemActive = productsModel.items[1];
cartModel.add(productsModel.itemActive);
console.log("Товары в корзине: ", cartModel.items);
console.log("Сумма товаров в корзине: ", cartModel.total());
console.log("Количество товаров в корзине: ", cartModel.count());
console.log(
    "Наличие товара в корзине: ",
    cartModel.checkItem("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);
console.log(
    "Наличие товара в корзине: ",
    cartModel.checkItem("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")
);
cartModel.delete(productsModel.itemActive);
console.log("Товары в корзине: ", cartModel.items);
cartModel.clear();
console.log("Товары в корзине: ", cartModel.items);
//Buyer
buyerModel.data = {
    address: "test",
    payment: "cash",
};
console.log("Данные покупателя: ", buyerModel.data);
buyerModel.data = {
    address: "test-1",
    email: "test-1",
    phone: "test-1",
    payment: "card",
};
console.log("Данные покупателя: ", buyerModel.data);
console.log("Валидность данных: ", buyerModel.validate());
buyerModel.clear();
console.log("Данные покупателя: ", buyerModel.data);
console.log("Валидность данных: ", buyerModel.validate());

Promise.all([api.getProducts()])
    .then((productResponse) => {
        productsModel.items = productResponse[0].items;
        console.log(productsModel.items);
    })
    .catch((err) => {
        console.error(err);
    });
