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

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, item: Transaction) => {
        switch (item.type) {
          case 'income':
            acc.income += item.value;
            acc.total += item.value;
            break;
          case 'outcome':
            acc.outcome += item.value;
            acc.total -= item.value;
            break;
          default:
            break;
        }

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

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
