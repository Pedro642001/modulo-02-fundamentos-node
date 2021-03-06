import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';



class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  
  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(title : string, value : number, type : 'income' | 'outcome') {
    const balance = this.transactionsRepository.getBalance()

    if(type == 'outcome' && balance.total - value < 0 ){
      throw Error('Não é possível realizar transação com saldo negativo')
    }

    const transaction = this.transactionsRepository.create(title,value, type)

    return transaction
  }
}

export default CreateTransactionService;
