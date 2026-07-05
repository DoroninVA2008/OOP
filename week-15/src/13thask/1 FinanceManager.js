"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceManager = void 0;
var FinanceManager = /** @class */ (function () {
    function FinanceManager() {
        this.transactions = [];
    }
    FinanceManager.prototype.getTransactions = function () {
        return this.transactions;
    };
    FinanceManager.prototype.getBalance = function () {
        return this.transactions.reduce(function (sum, t) { return sum + t.amount; }, 0);
    };
    FinanceManager.prototype.addTransaction = function (data) {
        try {
            if (!data.category || data.category.trim() === '') {
                return { success: false, error: 'Категория не может быть пустой' };
            }
            if (isNaN(data.amount) || data.amount === 0) {
                return { success: false, error: 'Сумма должна быть ненулевым числом' };
            }
            var transaction = __assign(__assign({}, data), { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), type: data.amount > 0 ? 'income' : 'expense' });
            this.transactions.push(transaction);
            return { success: true, transaction: transaction };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
        }
    };
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
    return FinanceManager;
}());
exports.FinanceManager = FinanceManager;
