// Часть A (Дженерики):
function toArray<T>(...args: T[]): T[] {
  return args;
}

const numbers = toArray(1, 2, 3, 4, 5);
const strings = toArray("Hello", "Vite", "+", "React", "+", "TypeScript", "!");

console.log(numbers);
console.log(strings);
// Часть B (Перегрузка функций):
function parseInput(input: string): number;

function parseInput(input: string, radix: number): number;

function parseInput(input: string, radix?: number): number {
  if (radix) {
    return parseInt(input, radix);
  } else {
    return parseInt(input, 10);
  }
};

const xmpl1 = parseInput("7");

console.log(xmpl1)
// Часть C (Утилитные типы Omit и Record):
interface Book {
  isbn: string;
  title: string;
  author: string;
  pages: number;
  inStockCount: number;
}

type BookCatalogItem = Omit<Book, 'inStockCount'>;

type LibraryCatalog = Record<Book['isbn'], BookCatalogItem>