
function TransactionService(transactions) {

  this.getTransactions = function(transactionId) {
    if (transactionId === '') {
      return transactions.getAllTransactions();
    }

    return transactions.getTransaction(transactionId)
      .then(results => {
        if(results.length === 0) {
          return [];
        }

        return results;
      });
  };

  /**
   * Changes the user ID associated with a transaction
   * @param {string} transactionId
   * @param {string} userId
   * @return {PromiseLike<boolean> | Promise<boolean>}
   */
  this.updateTransaction = function(transactionId, userId) {
    return transactions.updateTransaction(userId, transactionId)
      .then(result => result.resultSet.affectedRows === 1);
  };
}

module.exports = TransactionService;
