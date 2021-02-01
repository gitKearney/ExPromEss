function printDate(date = null) {
  let formatDate = date;
  if (!date) {
    formatDate = new Date();
  }

  return formatDate.toLocaleString('en-US', {hour12: true, timeZone: 'UTC'});
}

module.exports = printDate;