export function translateKey(value: string): string {
  const keys: Record<string, string> = {
    name: 'nombre',
    height: 'altura',
    mass: 'masa',
    hair_color: 'colorPelo',
    skin_color: 'colorPiel',
    eye_color: 'colorOjo',
    birth_year: 'aniversario',
    gender: 'genero',
    created: 'fechaFundado',
  };

  return keys[value];
}

export function getMethodNames<T>(obj: T): { [key: string]: keyof T } {
  const methods: { [key: string]: keyof T } = {};

  Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
    (prop) => typeof obj[prop as keyof T] === 'function' && prop !== 'constructor'
  );

  return methods;
}

export function getPropertyValueByType<T, K>(obj: T, type: new (...args: any[]) => K): K {
  return Object.entries(obj as any)
    .filter(([_, value]) => value instanceof type)
    .map(([_, value]) => value as K)[0];
}
