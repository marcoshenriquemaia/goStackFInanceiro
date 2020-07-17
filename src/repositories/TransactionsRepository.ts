import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransitionsDTO {
  title: string;
  value: number;
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

  // public getBalance(): Balance {
  //   // TODO
  // }

  public create({ title, value, type }: TransitionsDTO): Transaction {
    const newTransition = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(newTransition);

    return newTransition;
  }
}

export default TransactionsRepository;
