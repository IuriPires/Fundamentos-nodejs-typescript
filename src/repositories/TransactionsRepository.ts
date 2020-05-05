import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  value: number;
  title: string;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
      } else if (transaction.type === 'outcome') {
        balance.outcome += transaction.value;
      }
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ value, title, type }: TransactionDTO): Transaction {
    const dataObject = { value, title, type };

    const transaction = new Transaction(dataObject);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
