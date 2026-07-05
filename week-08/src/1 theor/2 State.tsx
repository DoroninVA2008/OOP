import { useState } from 'react';

const Counter = () => {
  // Явное указание типа: состояние - число
  const [count, setCount] = useState<number>(0);

  // TypeScript выведет тип `boolean` из начального значения `false`
  const [isActive, setIsActive] = useState(false);

  // Сложные типы: массив объектов. Тип лучше указать явно.
  interface Todo {
    id: number;
    text: string;
  }
  const [todos, setTodos] = useState<Todo[]>([]); // Начальное значение - пустой массив типа Todo

  // Состояние, которое может быть `null` (например, данные пользователя до загрузки)
  const [user, setUser] = useState<{ name: string } | null>(null);

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
};