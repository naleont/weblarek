import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    cartItems: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {
    protected cartList: HTMLElement;
    protected cartTotal: HTMLElement;
    protected buyButton: HTMLButtonElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.cartList = ensureElement<HTMLElement>(
            ".basket__list",
            this.container
        );
        this.cartTotal = ensureElement<HTMLElement>(
            ".basket__price",
            this.container
        );
        this.buyButton = ensureElement<HTMLButtonElement>(
            ".basket__button",
            this.container
        );
        this.buyButton.disabled = true

        this.buyButton.addEventListener("click", () => {
            this.events.emit("buy-cart");
        });
    }

    set cartItems(items: HTMLElement[]) {
        this.cartList.replaceChildren(...items);
        if (items.length === 0) {
            this.buyButton.disabled = true
        } else {
            this.buyButton.disabled = false
        }
    }

    set total(sum: number) {
        this.cartTotal.textContent = `${String(sum)} синапсов`;
    }
}
