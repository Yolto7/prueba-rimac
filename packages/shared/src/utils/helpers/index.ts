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
