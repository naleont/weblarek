import { IProduct } from "../../types";

export class Catalogue {
    private _items: IProduct[] = [];
    private _itemActive: IProduct | null = null;

    constructor() {}

    set items(items: IProduct[]) {
        this._items = items;
    }

    get items(): IProduct[] {
        return this._items;
    }

    set itemActive (item: IProduct) { 
        this._itemActive = item;
    }

    get itemActive(): IProduct | null {
        return this._itemActive ? this._itemActive : null;
    }

    getItem(id: string): IProduct {
        return this._items.filter(item => item.id === id)[0];
    }
}
