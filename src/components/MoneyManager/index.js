import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    balanceAmount: 0,
    incomeAmount: 0,
    expensesAmount: 0,
    titleInput: '',
    amountInput: '',
    optionId: 'INCOME',
    transactionsList: [],
  }

  ontitleChanged = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onAmountChanged = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onTypeChanged = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const deletedTransaction = transactionsList.filter(
      eachTransaction => eachTransaction.id === id,
    )
    const {amountInput, optionId} = deletedTransaction[0]
    let deducedIncomeAmount = 0
    let deducedExpensesAmount = 0
    if (optionId === 'INCOME') {
      deducedIncomeAmount = parseInt(amountInput)
    } else {
      deducedExpensesAmount = parseInt(amountInput)
    }
    const filteredTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState(prevState => ({
      transactionsList: filteredTransactionList,
      incomeAmount: prevState.incomeAmount - deducedIncomeAmount,
      expensesAmount: prevState.expensesAmount - deducedExpensesAmount,
      balanceAmount:
        prevState.incomeAmount -
        deducedIncomeAmount -
        (prevState.expensesAmount - deducedExpensesAmount),
    }))
  }

  onTransactionAdded = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    if (titleInput !== '' && amountInput !== '' && optionId !== '') {
      let newIncomeAmount = 0
      let newExpensesAmount = 0
      if (optionId === 'INCOME') {
        newIncomeAmount = parseInt(amountInput)
      } else {
        newExpensesAmount = parseInt(amountInput)
      }
      const newTransaction = {
        id: uuidv4(),
        titleInput,
        amountInput,
        optionId,
      }
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        titleInput: '',
        amountInput: '',
        optionId: 'INCOME',
        incomeAmount: prevState.incomeAmount + newIncomeAmount,
        expensesAmount: prevState.expensesAmount + newExpensesAmount,
        balanceAmount:
          prevState.incomeAmount +
          newIncomeAmount -
          (prevState.expensesAmount + newExpensesAmount),
      }))
    }
  }

  render() {
    const {
      balanceAmount,
      incomeAmount,
      expensesAmount,
      transactionsList,
      titleInput,
      optionId,
      amountInput,
    } = this.state

    return (
      <div className="app-container">
        <div className="header-section-container">
          <h1 className="header-section-heading">Hi, Richard</h1>
          <p className="header-section-info">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="form-and-history-container">
          <form className="submit-form" onSubmit={this.onTransactionAdded}>
            <h1 className="form-heading">Add Transaction</h1>
            <div className="input-field-container">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="TITLE"
                className="input-field"
                value={titleInput}
                onChange={this.ontitleChanged}
              />
            </div>
            <div className="input-field-container">
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder="AMOUNT"
                className="input-field"
                value={amountInput}
                onChange={this.onAmountChanged}
              />
            </div>
            <div className="input-field-container">
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                className="input-field"
                value={optionId}
                onChange={this.onTypeChanged}
              >
                <option value={transactionTypeOptions[0].optionId}>
                  Income
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  Expenses
                </option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <ul className="transactions-list">
              <li className="transactions-list-header">
                <p className="transactions-list-header-heading columnheader">
                  Title
                </p>
                <hr className="separator" />
                <p className="transactions-list-header-heading columnheader">
                  Amount
                </p>
                <hr className="separator" />
                <p className="transactions-list-header-heading columnheader">
                  Type
                </p>
              </li>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  transactionDetails={eachTransaction}
                  key={eachTransaction.id}
                  transactionTypeOptions={transactionTypeOptions}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
