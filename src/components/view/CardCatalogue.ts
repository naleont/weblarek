import { TCategoryClasses } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardView } from "./CardView";

export class CardCatalogue extends CardView {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected cardButton: HTMLButtonElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(events, container);

        this.categoryElement = ensureElement<HTMLElement>(
            ".card__category",
            this.container
        );
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            this.container
        );
        this.cardButton = this.container as HTMLButtonElement;

        this.cardButton.addEventListener("click", () => {
            this.events.emit("choose-card", { id: this.itemId });
        });
        
        this.categoryElement.classList.remove(`${categoryMap['софт-скил']}`)
    }

    set category(category: TCategoryClasses) {
        this.categoryElement.textContent = category;
        this.categoryElement.classList.add(`${categoryMap[category]}`);
    }

    set image(image: string) {
        this.imageElement.src = image;
    }
}
