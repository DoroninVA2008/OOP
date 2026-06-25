// 1. Сигнатуры перегрузки
function createConnection(config: string): DBConnection;
function createConnection(config: ConnectionOptions): DBConnection;

// 2. Единая реализация
function createConnection(config: string | ConnectionOptions): DBConnection {
  if (typeof config === 'string') {
    console.log(`Создаём соединение по строке: ${config}`);
  } else {
    console.log(`Создаём соединение с хостом: ${config.host}`);
  }
  return {} as DBConnection;
}

// Использование
const conn1 = createConnection('postgres://localhost');
const conn2 = createConnection({ host: 'localhost', port: 5432 });