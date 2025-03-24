import { format as tempo } from '@formkit/tempo';

export function formatDate({
  date,
  format = 'YYYY-MM-DD HH:mm:ss',
  tz = 'America/Lima',
}: {
  date: string | Date;
  format?: string;
  tz?: string;
}): string {
  return tempo({
    date,
    format,
    tz,
  });
}

export function getToday(format = 'YYYY-MM-DD'): string {
  return formatDate({
    date: new Date(),
    format,
  });
}

export function formatTimestamp(timestamp: number, format: string): string {
  const date = new Date(timestamp);

  // Diccionario con valores de la fecha
  const replacements: Record<string, string> = {
    YYYY: date.getUTCFullYear().toString(),
    MM: String(date.getUTCMonth() + 1).padStart(2, '0'),
    DD: String(date.getUTCDate()).padStart(2, '0'),
    HH: String(date.getUTCHours()).padStart(2, '0'),
    mm: String(date.getUTCMinutes()).padStart(2, '0'),
    ss: String(date.getUTCSeconds()).padStart(2, '0'),
  };

  // Reemplazar los valores en el formato solicitado
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => replacements[match]);
}
