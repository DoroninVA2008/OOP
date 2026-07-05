// Пример с private:
class BankAccount {
    private balance: number; // Скрытое внутреннее состояние

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    // Публичный метод — безопасный интерфейс для работы со счётом
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Внесено: ${amount}. Новый баланс: ${this.balance}`);
        }
    }

    // Прямой доступ к `balance` снаружи класса НЕВОЗМОЖЕН
    // account.balance = 1000000; // ОШИБКА: Свойство 'balance' является приватным.
}