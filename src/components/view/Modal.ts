import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>(
            ".modal__close",
            this.container
        );
        this.contentElement = ensureElement<HTMLElement>(
            ".modal__content",
            this.container
        );

        this.closeButton.addEventListener("click", this.closeModal.bind(this));
        this.container.addEventListener("click", this.modalClickHandler);
    }

    set content(content: HTMLElement | null) {
        if (content) {
            this.contentElement.replaceChildren(content);
        }
    }

    openModal(): void {
        this.container.classList.add("modal_active");
    }

    closeModal(): void {
        this.container.classList.remove("modal_active");
        this.content = null;
    }

    protected modalClickHandler = (evt: MouseEvent) => {
        const target = evt.target as HTMLElement;
        const currentTarget = evt.currentTarget as HTMLElement;

        if (target === currentTarget) {
            this.closeModal();
        }
    };
}
