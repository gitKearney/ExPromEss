
function TimeService() {
  let current = null;

  /**
   * change the current time
   * @param {Date} someTime
   * @return TimeService
   */
  this.setCurrentTime = function(someTime) {
    current = someTime;
    return this;
  };

  /**
   *
   * @returns {string}
   */
  this.makeMySQLDatetime = function() {
    // console.log('current is', current);

    let year    = current.getFullYear();
    let month   = current.getMonth() + 1;
    let day     = current.getDate();
    let hours   = current.getHours();
    let minutes = current.getMinutes();
    let seconds = current.getSeconds();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
}

module.exports = TimeService;
