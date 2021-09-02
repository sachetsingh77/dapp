const BigNumber = require('bignumber.js')
module.exports = (function () {
  let util = {}
  const singleUnit = 1e9;
  util.handleError = function (snack, e) {
    snack.display = true
    snack.text = e
    snack.color = "error"
  }
  util.handleInfo = function (snack, e) {
    snack.display = true
    snack.text = e
    snack.color = "info"
  }
  util.handleSuccess = function (snack, e) {
    snack.display = true
    snack.text = e
    snack.color = "success"
  }
  util.getPayableValue = function(units, price){
    const val = new BigNumber(singleUnit).times(units).times(price);
    return val.toString();//.integerValue(BigNumber.ROUND_DOWN).toFixed();
  }
  util.formatDate = function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    return day + "-" + month + "-" + date.getFullYear() + "  " + strTime;
  }
  util.toBN = function(number, decimalPlaces) {
    const multiplied = BigNumber(number).shiftedBy(decimalPlaces)
    return multiplied.integerValue(BigNumber.ROUND_DOWN)
  }
  util.toBNFixed = function(number) {
    const decimalPlaces = 18;
    const multiplied = BigNumber(number).shiftedBy(decimalPlaces)
    return multiplied.integerValue(BigNumber.ROUND_DOWN).toFixed()
  }

  return util
}())

