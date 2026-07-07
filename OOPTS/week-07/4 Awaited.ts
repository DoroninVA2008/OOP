// TypeScript 4.5+ предоставляет утилитарный тип Awaited. Он рекурсивно "разворачивает" промисы.

// Пример: допустим, у нас есть функция, возвращающая Promise<Promise<User>>
type NestedPromise = Promise<Promise<User>>;
type ResolvedType = Awaited<NestedPromise>; // ResolvedType будет равен просто User

// Это полезно в сложных обобщённых функциях или типах.