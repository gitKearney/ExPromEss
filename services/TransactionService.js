
function TransactionService(transactions) {

  this.getTransactions = function(transactionId, user) {
    if (transactionId === '') {
      if (user['user_id'] === 'admin') {
        // we're skipping auth checking, just get all transactions
        return transactions.getAllTransactions();
      }

      // else, allow this user to view all his/her transactions
      return transactions.getAllUserTransactions(user['user_id']);
    }
    

    if (user['role'] === 'create' || user['role'] === 'edit') {
      // admins and support can view this transaction
      return transactions.getTransaction(transactionId, '')
        .then(results => {
          if(results.length === 0) {
            return [];
          }

          return results;
        });
    }

    // this blocks one user from viewing the transaction of another user
    return transactions.getTransaction(transactionId, user['user_id'])
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
