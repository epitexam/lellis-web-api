export interface EmailProps {
    value: string;
}

export class Email {
    private _value: string;


    get value(): string {
        return this._value;
    }

    constructor(props: EmailProps) {
        if (props.value == null || !props.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Invalid email address");
        }

        this._value = props.value;
    }
}
