import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();

    let transaction;

    if (type === 'income') {
      transaction = this.transactionsRepository.create({
        value,
        title,
        type,
      });
      return transaction;
    }
    if (type === 'outcome' && balance.total > value) {
      transaction = this.transactionsRepository.create({
        value,
        title,
        type,
      });
      return transaction;
    }
    throw Error('The outcome is greater than total');
  }
}

export default CreateTransactionService;
