// import { ValueObject } from '.';

// export abstract class ArrayValueObject<T> extends ValueObject<T> {}

export abstract class ArrayValueObject<T> {
  private readonly _value: T[];
  protected isModified: boolean;

  constructor(value?: T[]) {
    this._value = value ?? [];
    this.isModified = false;
  }

  get value() {
    return this._value;
  }
}
