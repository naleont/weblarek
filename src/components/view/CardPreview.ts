import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardView } from "./CardView";

export class CardPreview extends CardView {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);

        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            this.container
        );
        this.categoryElement = ensureElement<HTMLElement>(
            ".card__category",
            this.container
        );
        this.descriptionElement = ensureElement<HTMLElement>(
            ".card__text",
            this.container
        );
        this.cardButton = ensureElement<HTMLButtonElement>(
            ".card__button",
            this.container
        );

        this.cardButton.addEventListener("click", this.cartActionListener);
    }

    protected cartActionListener = () => {
        this.events.emit("cart-action", { id: this.itemId });
    };

    set category(category: string) {
        this.categoryElement.textContent = category;
    }

    set description(text: string) {
        this.descriptionElement.textContent = text;
    }

    set image(image: string) {
        this.imageElement.src = image;
    }

    set buttonText(inCart: boolean) {
        this.cardButton.textContent = inCart
            ? "Удалить из корзины"
            : "В корзину";
        if (this.priceless) {
            this.cardButton.textContent = "Недоступно";
            this.cardButton.disabled = true;
            this.cardButton.removeEventListener(
                "click",
                this.cartActionListener
            );
        } else {
            this.cardButton.disabled = false;
            this.cardButton.addEventListener("click", this.cartActionListener);
        }
    }
}
