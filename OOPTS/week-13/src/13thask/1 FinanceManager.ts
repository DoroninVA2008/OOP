// Файл: src/core/FinanceManager.ts
import type { Transaction } from '../12thask/types.ts';

export class FinanceManager {
  private transactions: Transaction[] = [];

  // 1. Partial<T> для обновления
  // Мы можем обновить только несколько полей транзакции, а не все сразу.
  updateTransaction(id: string, updates: Partial<Omit<Transaction, 'id'>>) {
    const transaction = this.transactions.find(t => t.id === id);

    if (!transaction) {
      return false
    }

    Object.assign(transaction, updates);
    return true;
  }

  // 2. Pick<T, K> для возврата конкретных данных
  // Часто клиенту нужна не вся транзакция, а только её часть.
  getTransactionSummary(id: string): Pick<Transaction, 'amount' | 'date' | 'category'> | null {
    const transaction = this.transactions.find(t => t.id === id);

    if (!transaction) {
      return null
    }

    const { amount, date, category } = transaction;
    return { amount, date, category };
  }

  // 3. ReturnType для явного указания типа
  // Допустим, у нас есть внутренняя сложная функция для расчёта.
  private calculateComplexReport(): { total: number; tax: number } {
    const total = this.transactions.reduce((sum, t) => sum + t.amount, 0);
    const tax = total * 0.2;
    return { total, tax };
  }
  // Мы можем использовать её тип возврата для другой функции.
  getAnnualReport(): ReturnType<FinanceManager['calculateComplexReport']> {
    return this.calculateComplexReport();
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}