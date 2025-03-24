export const bufferMimeType = {
  png: '89504e47', // PNG
  jpg: 'ffd8ffe0', // JPG/JPEG
  jpeg: 'ffd8ffe1', // JPG/JPEG
  gif: '47494638', // GIF
  bmp: '424d', // BMP
  webp: '52494646', // WEBP
};

export function getBufferMimeType(buffer: Buffer) {
  const header = buffer.toString('hex', 0, 8);
  for (const [format, magic] of Object.entries(bufferMimeType)) {
    if (header.startsWith(magic)) {
      return format;
    }
  }

  return '';
}

export function getMethodsByPrototype<T>(prototype: T): { [key: string]: keyof T } {
  const methods: { [key: string]: keyof T } = {};

  Object.getOwnPropertyNames(prototype)
    .filter((prop) => typeof prototype[prop as keyof T] === 'function' && prop !== 'constructor')
    .forEach((methodName) => {
      methods[methodName] = methodName as keyof T;
    });

  return methods;
}

export function getPropertyValueByType<T, K>(obj: T, type: new (...args: any[]) => K): K {
  return Object.entries(obj as any)
    .filter(([_, value]) => value instanceof type)
    .map(([_, value]) => value as K)[0];
}

export async function streamToBuffer(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export function chunkArray<T>(array: T[], size: number) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function generatePassword(length = 32) {
  // Characters to use in the password
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=<>?';

  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secret += characters[randomIndex];
  }

  return secret;
}

export function stringToBoolean(value: string): boolean {
  return value.toLowerCase() === 'true';
}

export function areArraysEqual(arr1: unknown[], arr2: unknown[]): boolean {
  if (arr1.length !== arr2.length) return false;

  const sortedStr1 = JSON.stringify(
    [...arr1].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  );
  const sortedStr2 = JSON.stringify(
    [...arr2].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  );

  return sortedStr1 === sortedStr2;
}

export function hasFields(obj: object): boolean {
  return Object.keys(obj).length > 0;
}

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
