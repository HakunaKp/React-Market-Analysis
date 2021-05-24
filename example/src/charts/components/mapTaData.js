import TaData from './ImportTaData'
import Symbols from './ImportSymbols'

var date_vals = []
var open_vals = []
var high_vals = []
var low_vals = []
var close_vals = []
var sma_vals = []
var rsi_vals = []

for (let i = 0; i < Symbols.length; i++) {
    if (TaData[Symbols[i]]) {
        date_vals.push(Symbols[i])
        open_vals.push(Symbols[i])
        high_vals.push(Symbols[i])
        low_vals.push(Symbols[i])
        close_vals.push(Symbols[i])
        sma_vals.push(Symbols[i])
        rsi_vals.push(Symbols[i])

        const date = TaData[Symbols[i]].date;
        const open = TaData[Symbols[i]].open;
        const high = TaData[Symbols[i]].high;
        const low = TaData[Symbols[i]].low;
        const close = TaData[Symbols[i]].close;
        const sma = TaData[Symbols[i]].sma;
        const rsi = TaData[Symbols[i]].rsi;

        date_vals.push(date)
        open_vals.push(open)
        high_vals.push(high)
        low_vals.push(low)
        close_vals.push(close)
        sma_vals.push(sma)
        rsi_vals.push(rsi)
    }
}

export { date_vals, open_vals, high_vals, low_vals, close_vals, sma_vals, rsi_vals }