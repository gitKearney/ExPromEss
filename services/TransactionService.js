
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
   * Take items from a cart, creates a transaction and clears out the cart
   * @param userId
   * @return {*}
   */
  this.addTransaction = function(userId) {
    let trans = { user_id: userId, };

    // TODO: get items from user's cart
    // TODO: insert items from cart into transaction_products
    // TODO: delete items from cart
    return transactions.addTransaction(trans);
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
