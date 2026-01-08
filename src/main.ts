import { AppApi } from "./components/AppApi";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { Catalogue } from "./components/Models/Catalogue";
import { Basket } from "./components/view/Basket";
import { CardBasket } from "./components/view/CardBasket";
import { CardCatalogue } from "./components/view/CardCatalogue";
import { CardPreview } from "./components/view/CardPreview";
import { ContactsForm } from "./components/view/ContactsForm";
import { Gallery } from "./components/view/Gallery";
import { Header } from "./components/view/Header";
import { Modal } from "./components/view/Modal";
import { OrderForm } from "./components/view/OrderForm";
import { Success } from "./components/view/Success";
import "./scss/styles.scss";
import { IApi, IBuyer, IOrder, IProduct } from "./types";
import { API_URL, CDN_URL, settings } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

// Создание экземпляров классов брокера событий, модели и API
const broker = new EventEmitter();
const productsModel = new Catalogue(broker);
const cartModel = new Cart(broker);
const buyerModel = new Buyer(broker);
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

// Поиск и сохранение элементов разметки 
const page = document.querySelector(".page") as HTMLElement;
const headerContainer = ensureElement<HTMLElement>(".header", page);
const galleryContainer = ensureElement<HTMLElement>(".gallery", page);
const modalContainer = ensureElement<HTMLElement>(".modal", page);
// Необходимые темплейты
const CardCatalogueTemplate = ensureElement<HTMLTemplateElement>(
    "#card-catalog",
    page
);
const successTemplate = ensureElement<HTMLTemplateElement>("#success", page);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(
    "#card-preview",
    page
);
const cardBasketTemplate = ensureElement<HTMLTemplateElement>(
    "#card-basket",
    page
);
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket", page);
const orderFormTemplate = ensureElement<HTMLTemplateElement>("#order", page);
const contactsFormTemplate = ensureElement<HTMLTemplateElement>(
    "#contacts",
    page
);

// Создание экземпляров классов представления
const header = new Header(broker, headerContainer);
const gallery = new Gallery(broker, galleryContainer);
const modal = new Modal(broker, modalContainer);
const success = new Success(broker, cloneTemplate(successTemplate));
const cardPreview = new CardPreview(broker, cloneTemplate(cardPreviewTemplate));
const basket = new Basket(broker, cloneTemplate(basketTemplate));
const orderForm = new OrderForm(broker, cloneTemplate(orderFormTemplate));
const contactsForm = new ContactsForm(
    broker,
    cloneTemplate(contactsFormTemplate)
);

// Получение каталога товаров с сервера
Promise.all([api.getProducts()])
    .then((productResponse) => {
        productsModel.items = productResponse[0].items;
    })
    .catch((err) => {
        console.error(err);
    });

// Обработка событий презентером

// Каталог получен => отрисовка каталога
broker.on("catalogue-ready", () => {
    const cardsCatalogue = productsModel.items.map((item) => {
        const card = new CardCatalogue(
            broker,
            cloneTemplate(CardCatalogueTemplate)
        );
        return card.render({
            id: item.id,
            title: item.title,
            price: item.price || 0,
            image: CDN_URL + item.image,
            category: item.category,
        });
    });
    gallery.render({ gallery: cardsCatalogue });
});

// Выбор карточки для подробного отображения => запись выбранного товара в модели
broker.on("choose-card", ({ id }: { id: string }) => {
    productsModel.itemActive = productsModel.getItem(id) as IProduct;
});

// Выбранный товар записан в модель => открытие модального окна подробной карточки товара
broker.on("item-selected", () => {
    const itemActive = productsModel.itemActive as IProduct;
    if (itemActive) {
        modal.render({
            content: cardPreview.render({
                id: itemActive.id,
                title: itemActive.title,
                price: itemActive.price || 0,
                description: itemActive.description,
                category: itemActive.category,
                buttonText: cartModel.checkItem(itemActive.id),
                image: CDN_URL + itemActive.image
            }),
        });
        modal.openModal();
    }
});

// Нажатие добавления или удаления товара из корзины => передача изменений в модель
broker.on("cart-action", ({ id }: { id: string }) => {
    const item = productsModel.getItem(id) as IProduct;
    cartModel.checkItem(id) ? cartModel.delete(item) : cartModel.add(item);
});

// В модель внесены изменения корзины => перерисовка корзины и изменение текста кнопки подробной карточки
broker.on("cart-changed", ({ id }: { id: string }) => {
    if (id) {
        const cardsBasket = cartModel.items.map((item, indexArray) => {
            const card = new CardBasket(
                broker,
                cloneTemplate(cardBasketTemplate)
            );
            return card.render({
                id: item.id,
                title: item.title,
                price: item.price || 0,
                index: indexArray + 1,
            });
        });
        basket.total = cartModel.total();
        header.counter = cartModel.items.length;
        basket.render({ cartItems: cardsBasket });
        cardPreview.buttonText = cartModel.checkItem(id);
    } else {
        basket.total = 0;
        header.counter = 0;
        basket.render({ cartItems: [] });
    }
});

// Открытие корзины
broker.on("basket:open", () => {
    modal.render({ content: basket.render() });
    modal.openModal();
});

// Закрытие модального окна
broker.on("modal:close", () => {
    modal.closeModal();
});

// Нажатие кнопки "Оформить" в корзине => переход к форме ввода адреса доставки
broker.on("buy-cart", () => {
    const buyerData = buyerModel.data;
    modal.render({
        content: orderForm.render({
            payment: buyerData.payment,
            address: buyerData.address,
        }),
    });
    modal.openModal();
});

// Нажатие кнопки "Далее" в первой форме => переход к форме контактов 
broker.on("submit-order", () => {
    const buyerData = buyerModel.data;
    modal.render({
        content: contactsForm.render({
            email: buyerData.email,
            phone: buyerData.phone,
        }),
    });
    modal.openModal();
});

// Изменение полей формы => передача новых данных в модель
broker.on("form-update", ({ data }: { data: Partial<IBuyer> }) => {
    buyerModel.data = data;
});

// Данные покупателя в модели изменены => валидация формы
broker.on("buyer-updated", () => {
    const formErrors = buyerModel.validate();
    const buyerData = buyerModel.data;

    if ("payment" in formErrors || "address" in formErrors) {
        orderForm.valid(false);
        orderForm.errors = formErrors.payment || formErrors.address || "";
    } else {
        orderForm.valid(true);
        orderForm.errors = "";
    }

    if ("email" in formErrors || "phone" in formErrors) {
        contactsForm.valid(false);
        contactsForm.errors = formErrors.email || formErrors.phone || "";
    } else {
        contactsForm.valid(true);
        contactsForm.errors = "";
    }

    orderForm.payment = buyerData.payment || "";
    orderForm.address = buyerData.address || "";
    contactsForm.email = buyerData.email || "";
    contactsForm.phone = buyerData.phone || "";
});

// Нажатие кнопки "Оплатить" во втором шаге => отправка данных заказа на сервер, открытие окна успешного оформления заказа
broker.on("submit-contacts", () => {
    const buyerData = buyerModel.data;
    const cartItems = cartModel.items.map((item) => item.id);
    const orderData: IOrder = Object.assign(
        {},
        buyerData,
        { items: cartItems },
        { total: cartModel.total() }
    );
    Promise.all([api.postBuyer(orderData)])
        .then((orderResponse) => {
            modal.render({
                content: success.render({ paid: orderResponse[0].total }),
            });
            modal.openModal();
            cartModel.clear();
            buyerModel.clear();
        })
        .catch((err) => {
            console.error(err);
        });
});
