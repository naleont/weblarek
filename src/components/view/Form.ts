import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IForm {
    errors: string;
    email: string;
    phone: string;
    address: string;
    payment: TPayment;
    valid(valid: boolean): void;
}

export class Form extends Component<IForm> {
    protected formErrors: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.formErrors = ensureElement<HTMLElement>(
            ".form__errors",
            this.container
        );

        this.submitButton = ensureElement<HTMLButtonElement>(
            "button[type=submit]",
            this.container
        );
    }

    set errors(text: string) {
        this.formErrors.textContent = text;
    }

    valid(valid: boolean): void {
        this.submitButton.disabled = !valid;
    }
}
