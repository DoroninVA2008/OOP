import { User } from './1 Utility_Types'

function fetchUser(id: number): Promise<User> {
  // ... реализация
}

// Получаем тип её параметров (кортеж)
type FetchUserParams = Parameters<typeof fetchUser>; // [number]
// Получаем тип её возвращаемого значения
type FetchUserReturn = ReturnType<typeof fetchUser>; // Promise<User>