// Без дженериков: дублирование
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// С дженериком: одна универсальная функция
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

// Использование: тип можно указать явно или доверить вывод TypeScript
const num = getFirstElement<number>([1, 2, 3]); // Явно: T = number
const str = getFirstElement(['a', 'b', 'c']);   // Автовывод: T = string

type Pair<T> = [T, T]; // Пара значений одного типа
const numberPair: Pair<number> = [10, 20];
const stringPair: Pair<string> = ['hello', 'world'];