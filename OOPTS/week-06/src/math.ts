// Именованный экспорт (может быть несколько)
export function sum(a: number, b: number): number {
    return a + b;
}
export const PI = 3.14;

// Экспорт по умолчанию (один на модуль)
export default class Calculator { /* ... */ }