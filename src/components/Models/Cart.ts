import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    private _items: IProduct[];

    constructor(protected events: IEvents) {
        this._items = [];
    }

    get items(): IProduct[] {
        return this._items;
    }

    add(item: IProduct): void {
        this._items.push(item);
        // console.log(item)
        this.events.emit("cart-changed", { id: item.id });
    }

    delete(item: IProduct): void {
        this._items = this._items.filter((element) => element.id !== item.id);
        this.events.emit("cart-changed", { id: item.id });
    }

    clear(): void {
        this._items = [];
        this.events.emit("cart-changed", { id: "" });
    }

    total(): number {
        return this._items.reduce(
            (count, item) => count + (item.price || 0),
            0
        );
    }

    count(): number {
        return this._items.length;
    }

    checkItem(id: string): boolean {
        return this._items.filter((item) => item.id === id).length === 0
            ? false
            : true;
    }
}
