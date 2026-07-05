async function getGreeting(): Promise<string> {
  return "Привет, мир!"; // Тип возвращаемого значения автоматически Promise<string>
}

async function example() {
  const greeting: string = await getGreeting(); // "Разворачиваем" Promise<string> в string
  console.log(greeting); // Вывод: "Привет, мир!"
}