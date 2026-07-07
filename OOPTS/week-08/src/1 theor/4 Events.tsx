import { ChangeEvent, FormEvent, useState } from 'react';

const Form = () => {
  const [inputValue, setInputValue] = useState('');

  // Ключевой момент: правильный тип события для элемента
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // TypeScript знает, что у `target` есть `value`
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
};