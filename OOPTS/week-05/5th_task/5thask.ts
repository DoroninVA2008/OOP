abstract class Vehicle {
    brand: string;
    protected year: number;
    private readonly id: number;
    constructor (brand: string, year: number) {
        this.brand = brand;
        this.year = year;
        this.id = Date.now() + Math.random();
    }
    abstract getInfo(): string;
    public getId(): number {
        return this.id;
    }
    startEngine(): void {
        console.log("Двигатель Vehicle запущен");
    }
}

class Car extends Vehicle {
    private model: string;
    constructor (brand: string, model: string, year: number) {
        super(brand, year);
        this.model = model;
    }
    public getInfo(): string {
        return `Автомобиль ${this.brand} ${this.model}, ${this.year} г.в. (ID: ${this.getId()})`;
    }
    public startEngine(): void {
        console.log("Автомобиль заводится с ключа");
        super.startEngine(); 
    }
}

class Motorcycle extends Vehicle {
    private type: string;
    constructor(brand: string, type: string, year: number) {
        super(brand, year);
        this.type = type;
    }
    public getInfo(): string {
        return `Мотоцикл ${this.brand}, тип ${this.type}, ${this.year} г.в. (ID: ${this.getId()})`;
    }
}

class Garage {
    private vehicles: Vehicle[] = []; 
    public addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
    }
    public listVehicles(): void {
      if (this.vehicles.length === 0) {
            console.log("В гараже пока нет транспортных средств!");
            return;
        }
        
        this.vehicles.forEach((v, index) => {
            console.log(`${index + 1}. ${v.getInfo()}`);
        }); 
    } 
    public findVehicleById(id: number): Vehicle | undefined {
        return this.vehicles.find(v => v.getId() === id);
    }
}

const myGarage = new Garage();

const car1 = new Car("BMW", "X5", 2020);
const motorcycle1 = new Motorcycle("Harley-Davidson", "cruiser", 2021);
const car2 = new Car("Mercedes-Benz", "C-Class", 2022);
const motorcycle2 = new Motorcycle("Yamaha", "sport", 2023);
const car3 = new Car("Lada", "Priora", 2024);
const motorcycle3 = new Motorcycle("Mochita", "Drugster", 2025);

myGarage.addVehicle(car1);
myGarage.addVehicle(motorcycle1);
myGarage.addVehicle(car2);
myGarage.addVehicle(motorcycle2);
myGarage.addVehicle(car3);
myGarage.addVehicle(motorcycle3);

myGarage.listVehicles();

const searchId1 = car1.getId();

const foundVehicle = myGarage.findVehicleById(searchId1);

if (foundVehicle) {
    console.log(`Найден транспорт: ${foundVehicle.getInfo()}`);
    console.log("Запускаем двигатель:");
    foundVehicle.startEngine();
} else {
    console.log("Транспорт с таким ID не найден!");
}

const searchId2 = motorcycle1.getId();

const foundBike = myGarage.findVehicleById(searchId2);

if (foundBike) {
    console.log(`Найден байк: ${foundBike.getInfo()}`);
    console.log("Запускаем двигатель:");
    foundBike.startEngine();
} else {
    console.log("Байк с таким ID не найден!");
}