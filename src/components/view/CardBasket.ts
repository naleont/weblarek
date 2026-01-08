import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardView } from "./CardView";

export class CardBasket extends CardView {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);

        this.indexElement = ensureElement<HTMLHtmlElement>(
            ".basket__item-index",
            this.container
        );
        this.deleteButton = ensureElement<HTMLButtonElement>(
            ".basket__item-delete",
            this.container
        );

        this.deleteButton.addEventListener("click", () => {
            this.events.emit("cart-action", { id: this.itemId });
        });
    }

    set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}
