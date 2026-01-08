import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class OrderForm extends Form {
    protected cashButton: HTMLButtonElement;
    protected cardButton: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    constructor(
        protected events: IEvents,
        contaner: HTMLElement
    ) {
        super(contaner);

        this.cashButton = ensureElement<HTMLButtonElement>(
            "button[name=cash]",
            this.container
        );
        this.cardButton = ensureElement<HTMLButtonElement>(
            "button[name=card]",
            this.container
        );
        this.addressElement = ensureElement<HTMLInputElement>(
            "input[name=address]",
            this.container
        );
        this.submitButton = ensureElement<HTMLButtonElement>(
            ".order__button",
            this.container
        );

        this.cardButton.addEventListener("click", () => {
            this.events.emit("form-update", { data: { payment: "card" } });
        });
        this.cashButton.addEventListener("click", () => {
            this.events.emit("form-update", { data: { payment: "cash" } });
        });

        this.addressElement.addEventListener("keyup", () => {
            this.events.emit("form-update", {
                data: { address: this.addressElement.value },
            });
        });

        this.submitButton.addEventListener("click", () => {
            this.events.emit("submit-order");
        });
    }

    set payment(payment: string) {
        if (payment === "cash") {
            this.cashButton.classList.add("button_alt-active");
            this.cardButton.classList.remove("button_alt-active");
        } else if (payment === "card") {
            this.cardButton.classList.add("button_alt-active");
            this.cashButton.classList.remove("button_alt-active");
        }
    }

    set address(address: string) {
        this.addressElement.value = address;
    }
}
