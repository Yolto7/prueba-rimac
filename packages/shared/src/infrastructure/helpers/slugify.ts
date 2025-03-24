import slugify from 'slugify';

export function slugifyText(
  text: string,
  options?:
    | {
        replacement?: string;
        remove?: RegExp;
        lower?: boolean;
        strict?: boolean;
        locale?: string;
        trim?: boolean;
      }
    | string
): string {
  return slugify(text, options);
}
