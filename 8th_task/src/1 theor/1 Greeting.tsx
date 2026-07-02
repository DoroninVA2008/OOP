// 1. Описываем интерфейс для пропсов
interface GreetingProps {
  name: string;
  age?: number; // Необязательный пропс
}

// 2. Указываем тип в параметрах функции (часто с деструктуризацией)
const Greeting = ({ name, age }: GreetingProps) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

// 3. Использование (TypeScript проверит тип!)
export const App = () => <Greeting name="Alice" age={25} />;