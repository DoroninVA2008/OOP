// Абстрактный класс
abstract class Shape {
    constructor(public color: string) {}

    // Абстрактный метод (нет тела {})
    abstract calculateArea(): number;

    // Обычный метод
    public displayInfo(): void {
        console.log(`Эта фигура цвета ${this.color}.`);
    }
}

// Конкретный класс
class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    // ОБЯЗАТЕЛЬНАЯ реализация абстрактного метода
    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

// const shape = new Shape("red"); // ОШИБКА! Нельзя создать экземпляр абстрактного класса.
const myCircle = new Circle("синий", 5);
console.log(myCircle.calculateArea()); // 78.5398...
myCircle.displayInfo(); // Эта фигура цвета синий.