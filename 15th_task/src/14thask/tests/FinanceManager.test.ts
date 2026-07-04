// tests/FinanceManager.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { FinanceManager } from '../../13thask/1 FinanceManager.ts'
import type { Transaction } from '../../12thask/types.ts'

describe('FinanceManager', () => {
  let manager: FinanceManager;

  beforeEach(() => {
    manager = new FinanceManager();
  });

  it('должен корректно добавлять транзакцию', () => {
    const testTransaction: Omit<Transaction, 'id'> = {
      amount: 100, category: 'Food', date: new Date(),
      type: 'income'
    };

    const result = manager.addTransaction(testTransaction);

    expect(result.success).toBe(true);
    expect(manager.getTransactions()).toHaveLength(1);
  });

  it('должен корректно рассчитывать общий баланс', () => {
    manager.addTransaction({
      amount: 100, category: 'Income', date: new Date(),
      type: 'income'
    });
    manager.addTransaction({
      amount: -50, category: 'Transport', date: new Date(),
      type: 'income'
    });

    expect(manager.getBalance()).toBe(50);
  });
});