"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1_FinanceManager_ts_1 = require("../13thask/1 FinanceManager.ts");
var vitest_1 = require("vitest");
var manager = new _1_FinanceManager_ts_1.FinanceManager();
(0, vitest_1.expectTypeOf)().toEqualTypeOf();
(0, vitest_1.expectTypeOf)().toEqualTypeOf();
(0, vitest_1.expectTypeOf)().toEqualTypeOf();
(0, vitest_1.expectTypeOf)(manager.getBalance()).toBeNumber();
(0, vitest_1.expectTypeOf)(manager.getTransactions()).toEqualTypeOf();
(0, vitest_1.expectTypeOf)(manager.addTransaction).returns.toEqualTypeOf();
(0, vitest_1.expectTypeOf)().toBeBoolean();
// @ts-expect-error
manager.getTransaction({ category: 'food', date: new Date(), type: 'income' });
// @ts-expect-error
manager.addTransaction({ amount: 'сто рублей', category: 'food', date: new Date(), type: 'income' });
// @ts-expect-error
manager.getBalance(52);
