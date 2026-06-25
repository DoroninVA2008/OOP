var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, year) {
        this.brand = brand;
        this.year = year;
        this.id = Date.now() + Math.random();
    }
    Vehicle.prototype.getId = function () {
        return this.id;
    };
    Vehicle.prototype.startEngine = function () {
        console.log("Двигатель Vehicle запущен");
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, year) {
        var _this = _super.call(this, brand, year) || this;
        _this.model = model;
        return _this;
    }
    Car.prototype.getInfo = function () {
        return "\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C ".concat(this.brand, " ").concat(this.model, ", ").concat(this.year, " \u0433.\u0432. (ID: ").concat(this.getId(), ")");
    };
    Car.prototype.startEngine = function () {
        console.log("Автомобиль заводится с ключа");
        _super.prototype.startEngine.call(this);
    };
    return Car;
}(Vehicle));
var Motorcycle = /** @class */ (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle(brand, type, year) {
        var _this = _super.call(this, brand, year) || this;
        _this.type = type;
        return _this;
    }
    Motorcycle.prototype.getInfo = function () {
        return "\u041C\u043E\u0442\u043E\u0446\u0438\u043A\u043B ".concat(this.brand, ", \u0442\u0438\u043F ").concat(this.type, ", ").concat(this.year, " \u0433.\u0432. (ID: ").concat(this.getId(), ")");
    };
    return Motorcycle;
}(Vehicle));
var Garage = /** @class */ (function () {
    function Garage() {
        this.vehicles = [];
    }
    Garage.prototype.addVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };
    Garage.prototype.listVehicles = function () {
        if (this.vehicles.length === 0) {
            console.log("В гараже пока нет транспортных средств!");
            return;
        }
        this.vehicles.forEach(function (v, index) {
            console.log("".concat(index + 1, ". ").concat(v.getInfo()));
        });
    };
    Garage.prototype.findVehicleById = function (id) {
        return this.vehicles.find(function (v) { return v.getId() === id; });
    };
    return Garage;
}());
var myGarage = new Garage();
var car1 = new Car("BMW", "X5", 2020);
var motorcycle1 = new Motorcycle("Harley-Davidson", "cruiser", 2021);
var car2 = new Car("Mercedes-Benz", "C-Class", 2022);
var motorcycle2 = new Motorcycle("Yamaha", "sport", 2023);
var car3 = new Car("Lada", "Priora", 2024);
var motorcycle3 = new Motorcycle("Mochita", "Drugster", 2025);
myGarage.addVehicle(car1);
myGarage.addVehicle(motorcycle1);
myGarage.addVehicle(car2);
myGarage.addVehicle(motorcycle2);
myGarage.addVehicle(car3);
myGarage.addVehicle(motorcycle3);
myGarage.listVehicles();
var searchId1 = car1.getId();
var foundVehicle = myGarage.findVehicleById(searchId1);
if (foundVehicle) {
    console.log("\u041D\u0430\u0439\u0434\u0435\u043D \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442: ".concat(foundVehicle.getInfo()));
    console.log("Запускаем двигатель:");
    foundVehicle.startEngine();
}
else {
    console.log("Транспорт с таким ID не найден!");
}
var searchId2 = motorcycle1.getId();
var foundBike = myGarage.findVehicleById(searchId2);
if (foundBike) {
    console.log("\u041D\u0430\u0439\u0434\u0435\u043D \u0431\u0430\u0439\u043A: ".concat(foundBike.getInfo()));
    console.log("Запускаем двигатель:");
    foundBike.startEngine();
}
else {
    console.log("Байк с таким ID не найден!");
}
