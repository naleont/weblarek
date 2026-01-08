import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalogue {
    private _items: IProduct[] = [];
    private _itemActive: IProduct | null = null;

    constructor(protected events: IEvents) {}

    set items(items: IProduct[]) {
        this._items = items;
        this.events.emit("catalogue-ready");
    }

    get items(): IProduct[] {
        return this._items;
    }

    set itemActive(item: IProduct) {
        this._itemActive = item;
        this.events.emit("item-selected");
    }

    get itemActive(): IProduct | null {
        return this._itemActive;
    }

    getItem(id: string): IProduct | undefined {
        return this._items.find((item) => item.id === id);
    }
}
