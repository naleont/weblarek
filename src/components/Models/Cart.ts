import { IProduct } from "../../types";

export class Cart {
    private _items: IProduct[];

    constructor() {
        this._items = [];
    }

    get items(): IProduct[] {
        return this._items;
    }

    add(item: IProduct): void {
        this._items.push(item);
    }

    delete(item: IProduct): void {
        this._items = this._items.filter((element) => element.id !== item.id);
    }

    clear(): void {
        this._items = [];
    }

    total(): number {
        // Проверка цены не null может понадобиться, если надо будет реализовывать возможность добавления бесценного товара в корзину. 
        // В текущем ТЗ бесценный товар в корзине оказаться не может. VSCode указывает ошибку 'item.price is possibly null' независимо от наличия или отсутствия фильтра.
        return (
            this._items
                // .filter(item => item.price !== null)
                .reduce((count, item) => count + item.price, 0)
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
