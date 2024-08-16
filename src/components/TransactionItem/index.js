import './index.css'

const TransactionItem = props => {
  const {transactionDetails, transactionTypeOptions, deleteTransaction} = props
  const {id, titleInput, amountInput, optionId} = transactionDetails
  const transactionTypeObj = transactionTypeOptions.filter(
    eachType => eachType.optionId === optionId,
  )
  const transactionType = transactionTypeObj[0].displayText

  const onDeleteBtnClicked = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transactions-list-item">
      <p className="title columniteminfo">{titleInput}</p>
      <hr className="separator" />
      <p className="amount columniteminfo">Rs {amountInput}</p>
      <hr className="separator" />
      <p className="type columniteminfo">{transactionType}</p>
      <hr className="separator" />
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteBtnClicked}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default TransactionItem
