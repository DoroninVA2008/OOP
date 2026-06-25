class Product {
    // 1. Свойства (поля) класса
    title: string;
    price: number;

    // 2. Конструктор - специальный метод для инициализации нового объекта
    constructor(productTitle: string, productPrice: number) {
        this.title = productTitle;
        this.price = productPrice;
    }

    // 3. Метод класса - действие, которое может выполнить объект
    getDescription(): string {
        return `Товар "${this.title}" стоит ${this.price} руб.`;
    }
}

// 4. Создание объекта (экземпляра класса) с помощью оператора 'new'
const myBook = new Product("Книга по TypeScript", 1500);
console.log(myBook.getDescription()); // Товар "Книга по TypeScript" стоит 1500 руб.