
const getArrayData = (stock, array, interval) => {
    var interval_index = 0
    switch(interval) {
      case "1Min_390":
        interval_index = 0
        break;
      case "1Min_1000":
        interval_index = 200
        break;
      case "5Min_78":
        interval_index = 400
        break;
      case "5Min_390":
        interval_index = 600
        break;
      case "5Min_780":
        interval_index = 800
        break;
      case "15Min_26":
        interval_index = 1000
        break;
      case "15Min_130":
        interval_index = 1200
        break;
      case "15Min_260":
        interval_index = 1400
        break;
      case "15Min_546":
        interval_index = 1600
        break;
      case "day_21":
        interval_index = 1800
        break;
      case "day_63":
        interval_index = 2000
        break;
      case "day_126":
        interval_index = 2200
        break;
      case "day_252":
        interval_index = 2400
        break;
      case "day_504":
        interval_index = 2600
        break;
      case "day_756":
        interval_index = 2800
        break;
      default:
        // code block
    }
    var stock_index = array.indexOf(stock) + 1
    stock_index += interval_index
    return array[stock_index]
}
export default getArrayData