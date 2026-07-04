"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceManager = void 0;
var FinanceManager = /** @class */ (function () {
    function FinanceManager() {
        this.transactions = [];
    }
    // 1. Partial<T> для обновления
    // Мы можем обновить только несколько полей транзакции, а не все сразу.
    FinanceManager.prototype.updateTransaction = function (id, updates) {
        var transaction = this.transactions.find(function (t) { return t.id === id; });
        if (!transaction) {
            return false;
        }
        Object.assign(transaction, updates);
        return true;
    };
    // 2. Pick<T, K> для возврата конкретных данных
    // Часто клиенту нужна не вся транзакция, а только её часть.
    FinanceManager.prototype.getTransactionSummary = function (id) {
        var transaction = this.transactions.find(function (t) { return t.id === id; });
        if (!transaction) {
            return null;
        }
        var amount = transaction.amount, date = transaction.date, category = transaction.category;
        return { amount: amount, date: date, category: category };
    };
    // 3. ReturnType для явного указания типа
    // Допустим, у нас есть внутренняя сложная функция для расчёта.
    FinanceManager.prototype.calculateComplexReport = function () {
        var total = this.transactions.reduce(function (sum, t) { return sum + t.amount; }, 0);
        var tax = total * 0.2;
        return { total: total, tax: tax };
    };
    // Мы можем использовать её тип возврата для другой функции.
    FinanceManager.prototype.getAnnualReport = function () {
        return this.calculateComplexReport();
    };
    FinanceManager.prototype.addTransaction = function (transaction) {
        this.transactions.push(transaction);
    };
    return FinanceManager;
}());
exports.FinanceManager = FinanceManager;
