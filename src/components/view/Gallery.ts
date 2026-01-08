import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
    gallery: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected galleryElement: HTMLElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.galleryElement = this.container;
    }

    set gallery(items: HTMLElement[]) {
        this.galleryElement.replaceChildren(...items);
    }
}
