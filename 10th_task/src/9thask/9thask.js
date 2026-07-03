"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(init) {
        var _a, _b, _c;
        this.id = (_a = init.id) !== null && _a !== void 0 ? _a : Date.now();
        this.title = (_b = init.title) !== null && _b !== void 0 ? _b : '';
        this.complete = (_c = init.complete) !== null && _c !== void 0 ? _c : false;
        this.createdAt = init.createdAt ? new Date(init.createdAt) : new Date();
    }
    Task.prototype.close = function () {
        this.complete = true;
    };
    Task.prototype.isComplete = function () {
        return this.complete;
    };
    Task.prototype.toJSon = function () {
        return {
            id: this.id,
            title: this.title,
            complete: this.complete,
            createdAt: this.createdAt.toUTCString(), // Узнал про toUTCString() у ChatGPT: Используется, когда нужно явно указать, что дата и время в универсальном времени (UTC)
        };
    };
    Task.fromJSon = function (data) {
        var task = new Task({
            id: data.id,
            title: data.title,
            complete: data.complete,
            createdAt: new Date(data.createdAt),
        });
        return task;
    };
    return Task;
}());
exports.Task = Task;
