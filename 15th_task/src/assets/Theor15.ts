// Условные типы (Conditional Types)
// Это типы, которые могут меняться в зависимости от условия. Синтаксис: T extends U ? X : Y
// Пример: тип, который превращает null/undefined в never, а другие оставляет как есть
type MyNonNullable<T> = T extends null | undefined ? never : T;
export type ExampleValue = MyNonNullable<string | null>; // Тип ExampleValue - только string, null отброшен

// Волшебное слово infer
// infer позволяет вывести и захватить тип из другого типа внутри условной конструкции. Его можно использовать только в "истинной" ветке (?) условного типа.
// Базовый паттерн:
// type Пример<T> = T extends (somePattern infer R) ? R : never;

// Попробуйте в уме:

// ============================================
// 1. Получить тип элемента массива
// ============================================
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Примеры использования: 
// @ts-ignore
type A = ArrayElement<string[]> // string
// @ts-ignore
type B = ArrayElement<number[]> // number
// @ts-ignore
type C = ArrayElement<boolean[]> // boolean
// @ts-ignore
type D = ArrayElement<{name: string}[]> // { name: string }
// @ts-ignore
type E = ArrayElement<string> // never (не массив)

// ============================================
// 2. Получить тип, который возвращает функция
// ============================================
type OurReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Примеры использования:
// @ts-ignore
type F = OurReturnType<() => number> // number
// @ts-ignore
type G = OurReturnType<() => string> // string
// @ts-ignore
type H = OurReturnType<(x: number) => boolean> // boolean
// @ts-ignore
type I = OurReturnType<() => Promise<string>> // Promise<string>
// @ts-ignore
type J = OurReturnType<string> // never (не функция)

// ============================================
// 3. Получить тип значения внутри Promise
// ============================================
type Awaited<T> = T extends Promise<infer U> ? U : never;

// Примеры использования:
// @ts-ignore
type K = Awaited<Promise<boolean>> // boolean
// @ts-ignore
type L = Awaited<Promise<string>> // string
// @ts-ignore
type M = Awaited<Promise<number[]>> // number[]
// @ts-ignore
type N = Awaited<string> // never (не Promise)

// ============================================
// ДОПОЛНИТЕЛЬНО: Комбинируем типы вместе
// ============================================
// Получаем тип элемента из Promise, который возвращает массив
type ExtractArrayElementFromPromise<T> = 
  T extends Promise<infer U> 
    ? U extends (infer V)[] 
      ? V 
      : never 
    : never;
// @ts-ignore
type Complex = ExtractArrayElementFromPromise<Promise<string[]>>; // string

// Получаем возвращаемый тип из асинхронной функции
type AsyncFunctionReturnType<T> = 
  T extends (...args: any[]) => Promise<infer R> 
    ? R 
    : never;
// @ts-ignore
type Result = AsyncFunctionReturnType<() => Promise<number>>; // number

    // 1. Директива @ts-expect-error (встроена в TypeScript)

// Проверяем, что НЕправильный вызов вызывает ошибку типов
function add(a: number, b: number): number { return a + b; }

// @ts-expect-error - следующий код ДОЛЖЕН вызывать ошибку компиляции
add('строка', 5); // Хорошо: компилятор здесь ругнётся, и директива это "ожидает"

// Если ошибки не будет - компилятор сам сообщит о проблеме с @ts-expect-error

// 2. Использование expectTypeOf из Vitest (предпочтительно для проектов)

import { expectTypeOf } from 'vitest';

function greet(name: string): string { return `Hello, ${name}`; }

// Тестируем тип возвращаемого значения
expectTypeOf(greet).returns.toBeString(); // Проверяет, что greet возвращает string
// expectTypeOf(greet).parameters.toMatchTypeOf<[string]>(); // Проверяет типы аргументов
