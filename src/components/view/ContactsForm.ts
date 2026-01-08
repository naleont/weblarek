import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(
        protected events: IEvents,
        container: HTMLElement
    ) {
        super(container);

        this.emailElement = ensureElement<HTMLInputElement>(
            "input[name=email]",
            this.container
        );
        this.phoneElement = ensureElement<HTMLInputElement>(
            "input[name=phone]",
            this.container
        );

        this.emailElement.addEventListener("keyup", () => {
            this.events.emit("form-update", {
                data: { email: this.emailElement.value },
            });
        });

        this.phoneElement.addEventListener("keyup", () => {
            this.events.emit("form-update", {
                data: { phone: this.phoneElement.value },
            });
        });

        this.submitButton.addEventListener("click", (event) => {
            // При написании кода было все сначала хорошо без peventDefault,
            // а потом вместо перехода к окну успешной покупки стала происходить
            // перезагрузка страницы. Я так и не поняла, что я такого исправила,
            // что изменилось поведение, пришлось добавлять peventDefault.
            // В предыдущем шаге формы кнопка типа submit корректно отрабатывает без этой функции.
            event.preventDefault();
            this.events.emit("submit-contacts");
        });
    }

    set email(email: string) {
        this.emailElement.value = email;
    }

    set phone(phone: string) {
        this.phoneElement.value = phone;
    }
}
