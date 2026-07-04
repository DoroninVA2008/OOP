// Файл: src/core/FinanceManager.ts
import type { Transaction } from '../12thask/types.ts'

export interface AddTransactionResult {
  success: boolean;
  transaction?: Transaction;
  error?: string;
}

export class FinanceManager {
  getTransactions(): Transaction[] {
    return this.transactions;
  }
  getBalance(): number {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }
  private transactions: Transaction[] = [];

  addTransaction(data: Omit<Transaction, 'id'>): AddTransactionResult {
    try {
      if (!data.category || data.category.trim() === '') {
        return { success: false, error: 'Категория не может быть пустой' };
      }
      
      if (isNaN(data.amount) || data.amount === 0) {
        return { success: false, error: 'Сумма должна быть ненулевым числом' };
      }

      const transaction: Transaction = {
        ...data,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: data.amount > 0 ? 'income' : 'expense'
      };
      
      this.transactions.push(transaction);
      return { success: true, transaction };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
    }
  }

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
}