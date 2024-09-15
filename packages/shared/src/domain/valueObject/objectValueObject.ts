export abstract class ObjectValueObject<T> {
  private readonly _value: T;
  protected isModified: boolean;

  constructor(value?: T) {
    this._value = value ?? ({} as T);
    this.isModified = false;
  }

  get value() {
    return this._value;
  }
}
