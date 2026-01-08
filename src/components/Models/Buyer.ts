import { IBuyer, TErrors, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    private _payment: TPayment;
    private _email: string;
    private _phone: string;
    private _address: string;

    constructor(protected events: IEvents) {
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
        this.events.emit("buyer-updated");
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
        this.events.emit("buyer-updated");
    }

    validate(): TErrors {
        const formErrors: TErrors = {};
        if (!this._payment) {
            formErrors.payment = "Выберите способ оплаты";
        }
        if (!this._email) {
            formErrors.email = "Укажите email";
        }
        if (!this._phone) {
            formErrors.phone = "Укажите телефон";
        }
        if (!this._address) {
            formErrors.address = "Укажите адрес доставки";
        }
        return formErrors;
    }
}
