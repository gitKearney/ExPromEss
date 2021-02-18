const query  = require('./_Query');
const uuidv4 = require('uuid/v4');

function Transactions() {
  this.getAllTransactions = function() {
    let sql = `
SELECT t.created_at, t.transaction_id, u.first_name, u.last_name    
FROM transactions AS t 
INNER JOIN users AS u ON t.user_id = u.user_id`;

    return query(sql, {})
      .then(results => results.resultSet);
  };

  this.getAllUserTransactions = function(userId) {
    let sql = `
SELECT t.created_at, t.transaction_id, u.first_name, u.last_name    
FROM transactions AS t 
INNER JOIN users AS u ON t.user_id = u.user_id
WHERE user_id = :user_id`;

    return query(sql, { user_id: userId, })
      .then(results => results.resultSet);
  };

  this.getTransaction = function(transId, userId) {
    let sql = `SELECT 
t.user_id, t.created_at, tp.product_price, p.title, u.first_name, u.last_name
FROM transactions AS t
INNER JOIN transaction_products AS tp ON t.transaction_id = tp.transaction_id
INNER JOIN products AS p ON tp.product_id = p.product_id
INNER JOIN users AS u ON t.user_id = u.user_id
WHERE t.transaction_id = :trans_id
`;

    if (userId.length === 36) {
      sql += ' AND t.user_id = :user_id';
    }

    return query(sql, { trans_id: transId, user_id: userId, })
      .then(results => results.resultSet);
  };

  this.addTransaction = function(values) {
    let sql = `
INSERT INTO transactions (transaction_id, user_id)
VALUES (:trans_id, :user_id)`;

    let transId = null;

    return this.getTransactionIds()
      .then(results => {
        let index = 0;
        let ids = results.resultSet;
        do {
          transId = uuidv4();
          index = ids.findIndex(element => element.product_id === transId);
        } while(index !== -1);

        values['trans_id'] = transId;
        return query(sql, values);
      })
      .then(() => {
        return transId;
      });
  };

  this.updateTransaction = function(userId, transactionId) {
    let sql = `UPDATE transactions 
SET user_id = :user_id WHERE user_id = :user_id
AND transaction_id = :transaction_id`;

    let params = {user_id: userId, transaction_id: transactionId, };
    return query(sql, params);
  };

  this.getTransactionIds = function() {
    let sql = 'SELECT transaction_id FROM transactions';
    return query(sql, {});
  };

  this.addTransactionProducts = function(insertValues) {
    let sql = `
INSERT INTO transaction_products (transaction_id, product_id, product_price) 
VALUES :inserts`;

    return query(sql, { inserts: insertValues, });
  };
}

module.exports = Transactions;
