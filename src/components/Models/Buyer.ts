import { IBuyer, IBuyerValid, TPayment } from "../../types";

export class Buyer {
    private _payment: TPayment;
    private _email: string;
    private _phone: string;
    private _address: string;

    constructor() {
        this._payment = "";
        this._email = "";
        this._phone = "";
        this._address = "";
    }

    set data(data: IBuyer) {
        this._payment = data.payment;
        this._email = data.email;
        this._phone = data.phone;
        this._address = data.address;
    }

    set payment(data: TPayment) {
        this._payment = data;
    }

    set email(data: string) {
        this._email = data;
    }

    set phone(data: string) {
        this._phone = data;
    }

    set address(data: string) {
        this._address = data;
    }

    get data(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
        };
    }

    clear(): void {
        this._payment = "";
        this._email = "";
        this._phone = "";
        this._address = "";
    }

    validate(data: IBuyer): IBuyerValid {
        return {
            payment: data.payment ? "" : "Выберите способ оплаты",
            email: data.email ? "" : "Укажите email",
            phone: data.phone ? "" : "Укажите телефон",
            address: data.address ? "" : "Укажите адрес доставки",
        };
    }
}
