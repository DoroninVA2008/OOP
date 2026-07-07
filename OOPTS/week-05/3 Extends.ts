// 1. Базовый (родительский) класс
class Vehicle {
    getId() {
        throw new Error("Method not implemented.");
    }
    getInfo() {
        throw new Error("Method not implemented.");
    }
    constructor(public brand: string, protected year: number) {}

    public startEngine(): void {
        console.log(`Двигатель ${this.brand} запущен.`);
    }
}

// 2. Дочерний класс. Ключевое слово 'extends'
class Car extends Vehicle {
    // 3. Дополнительное свойство, specific для Car
    private model: string;

    constructor(brand: string, year: number, model: string) {
        // 4. Вызов конструктора родительского класса ОБЯЗАТЕЛЕН через super()
        super(brand, year);
        this.model = model;
    }

    // 5. Расширение функциональности родителя
    public getInfo(): string {
        // Можно обратиться к protected-свойству родителя
        return `Автомобиль ${this.brand} ${this.model}, ${this.year} года выпуска.`;
    }

    // 6. Переопределение метода родителя (можно использовать `override`)
    public startEngine(): void {
        console.log(`Автомобиль ${this.model} заводится с кнопки.`);
        // Можно также вызвать оригинальный метод родителя
        super.startEngine();
    }
}

const myCar = new Car('Toyota', 2022, 'Camry');
console.log(myCar.getInfo()); // Автомобиль Toyota Camry, 2022 года выпуска.
myCar.startEngine(); // Автомобиль Camry заводится с кнопки. \n Двигатель Toyota запущен.