import { IProduct } from "../../types";

export class Catalogue {
    private _items: IProduct[];
    private _itemActive!: IProduct;

    // Понять, как оставить конструктор пустым. Был способ не задавать поля через конструктор, а делать это в методах.
    constructor() {
        this._items = [];
    }

    set items(items: IProduct[]) {
        this._items = items;
    }

    get items(): IProduct[] {
        return this._items;
    }

    set itemActive(id: string) {
        this._itemActive = this._items.filter((item) => item.id === id)[0];
    }

    get itemActive(): IProduct {
        return this._itemActive;
    }

    getItem(id: string): IProduct {
        return this._items.filter((item) => item.id === id)[0];
    }
}
