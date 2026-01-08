import { TCategoryClasses } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICardView {
    id: string;
    title: string;
    price: number | null;
    category: TCategoryClasses;
    image: string;
    description: string;
    inCart: boolean;
    index: number;
}

export class CardView extends Component<ICardView> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected itemId: string = "";
    protected priceless: boolean;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>(
            ".card__title",
            this.container
        );
        this.priceElement = ensureElement<HTMLElement>(
            ".card__price",
            this.container
        );

        this.priceless = false;
    }

    set title(title: string) {
        this.titleElement.textContent = title;
    }

    set price(price: number | null) {
        if (price) {
            this.priceElement.textContent = `${String(price)} синапсов`;
            this.priceless = false;
        } else {
            this.priceElement.textContent = "Бесценно";
            this.priceless = true;
        }
    }

    set id(value: string) {
        this.itemId = value;
    }
}
