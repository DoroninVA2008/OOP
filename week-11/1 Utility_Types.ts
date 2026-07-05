export interface User {
  id: number;
  name: string;
  email?: string; // Опциональное поле
  age: number;
}
// Неправильно: здесь id стал опциональным, но нам он нужен обязательным.
type UpdateUserRequest = Partial<User>;

// Правильно: используем пересечение типов (&).
// Мы говорим: "Этот тип должен быть Partial от User, но также у него обязательно должно быть поле id,
// тип которого мы берём из оригинала (User['id'])".
type UpdateUserRequest = Partial<User> & { id: User['id'] };
// Итог: { id: number; name?: string; email?: string; age?: number }

// Альтернативный, более явный способ через Pick и Omit:
// 1. Сначала вытащим id как обязательное поле.
// 2. Добавим к нему все остальные поля, но сделав их опциональными.
type UpdateUserRequestAlt = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;
// Результат будет идентичным.