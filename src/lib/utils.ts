export type ClassValue = string | number | boolean | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function process(value: ClassValue): void {
    if (value == null || typeof value === 'boolean') return;
    if (typeof value === 'string' || typeof value === 'number') {
      if (value) {
        classes.push(String(value));
      }
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        process(item);
      }
    }
  }

  for (const input of inputs) {
    process(input);
  }

  return classes.join(' ');
}