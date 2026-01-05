import { IBuyer, TErrors, TPayment } from "../../types";

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

    set data(data: Partial<IBuyer>) {
        if (data.payment !== undefined) {
            this._payment = data.payment;
        }
        if (data.email !== undefined) {
            this._email = data.email;
        }
        if (data.phone !== undefined) {
            this._phone = data.phone;
        }
        if (data.address !== undefined) {
            this._address = data.address;
        }
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

    validate(): TErrors {
        return {
            payment: this._payment ? "" : "Выберите способ оплаты",
            email: this._email ? "" : "Укажите email",
            phone: this._phone ? "" : "Укажите телефон",
            address: this._address ? "" : "Укажите адрес доставки",
        };
    }
}
