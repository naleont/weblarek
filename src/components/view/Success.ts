import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISUccess {
    paid: number;
}

export class Success extends Component<ISUccess> {
    protected paidElement: HTMLElement;
    protected newPurchaseButton: HTMLButtonElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.paidElement = ensureElement<HTMLElement>(
            ".order-success__description",
            this.container
        );
        this.newPurchaseButton = ensureElement<HTMLButtonElement>(
            ".order-success__close",
            this.container
        );

        this.newPurchaseButton.addEventListener("click", () => {
            this.events.emit("modal:close");
        });
    }

    set paid(sum: number) {
        this.paidElement.textContent = `Списано ${sum} синапсов`;
    }
}
