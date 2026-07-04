import { type AddTransactionResult, FinanceManager } from '../13thask/1 FinanceManager.ts'
import { expectTypeOf } from 'vitest'
import type { Transaction } from '../12thask/types.ts'

type ExtractArrayType<T> = T extends (infer Item)[] ? Item : never

const manager = new FinanceManager()

expectTypeOf<ExtractArrayType<Transaction[]>>().toEqualTypeOf<Transaction>()
expectTypeOf<ExtractArrayType<number[]>>().toEqualTypeOf<number>()
expectTypeOf<ExtractArrayType<string>>().toEqualTypeOf<never>()
expectTypeOf(manager.getBalance()).toBeNumber()
expectTypeOf(manager.getTransactions()).toEqualTypeOf<Transaction[]>()
expectTypeOf(manager.addTransaction).returns.toEqualTypeOf<AddTransactionResult>()
expectTypeOf<AddTransactionResult['success']>().toBeBoolean()
// @ts-expect-error
manager.getTransaction({ category: 'food', date: new Date(), type: 'income' })
// @ts-expect-error
manager.addTransaction({ amount: 'сто рублей', category: 'food', date: new Date(), type: 'income' })
// @ts-expect-error
manager.getBalance(52)