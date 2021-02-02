const TimeService = require('../services/timeService');

function printDate(date = null) {
  let formatDate = date;
  const timeService = new TimeService();
  if (!date) {
    formatDate = new Date();
  }

  timeService.setCurrentTime((formatDate));
  return timeService.makeMySQLDatetime();

  // formatDate.toLocaleString('en-US', { hour12: true, timeZone: 'UTC', });
}

module.exports = printDate;
