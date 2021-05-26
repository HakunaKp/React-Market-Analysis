import TaData1M390 from './TaData/ImportTaData1M390'
import TaData1M1000 from './TaData/ImportTaData5M390'
import TaData5M78 from './TaData/ImportTaData5M78'
import TaData5M390 from './TaData/ImportTaData5M390'
import TaData5M780 from './TaData/ImportTaData5M780'
import TaData15M26 from './TaData/ImportTaData15M26'
import TaData15M130 from './TaData/ImportTaData15M130'
import TaData15M260 from './TaData/ImportTaData15M260'
import TaData15M546 from './TaData/ImportTaData15M546'
import TaData1D21 from './TaData/ImportTaData1D21'
import TaData1D63 from './TaData/ImportTaData1D63'
import TaData1D126 from './TaData/ImportTaData1D126'
import TaData1D252 from './TaData/ImportTaData1D252'
import TaData1D504 from './TaData/ImportTaData1D504'
import TaData1D756 from './TaData/ImportTaData1D756'
import Symbols from './ImportSymbols'

const TaData = [TaData1M390, TaData1M1000, TaData5M78, TaData5M390, TaData5M780, TaData15M26, 
    TaData15M130, TaData15M260, TaData15M546, TaData1D21, TaData1D63, TaData1D126, TaData1D252, TaData1D504, TaData1D756]

var date_vals = []
var open_vals = []
var high_vals = []
var low_vals = []
var close_vals = []
var sma_vals = []
var rsi_vals = []

for (let j = 0; j < TaData.length; j++) {
    for (let i = 0; i < Symbols.length; i++) {
        if (TaData[j][Symbols[i]]) {
            date_vals.push(Symbols[i])
            open_vals.push(Symbols[i])
            high_vals.push(Symbols[i])
            low_vals.push(Symbols[i])
            close_vals.push(Symbols[i])
            sma_vals.push(Symbols[i])
            rsi_vals.push(Symbols[i])
    
            const date = TaData[j][Symbols[i]].date;
            const open = TaData[j][Symbols[i]].open;
            const high = TaData[j][Symbols[i]].high;
            const low = TaData[j][Symbols[i]].low;
            const close = TaData[j][Symbols[i]].close;
            const sma = TaData[j][Symbols[i]].sma;
            const rsi = TaData[j][Symbols[i]].rsi;
    
            date_vals.push(date)
            open_vals.push(open)
            high_vals.push(high)
            low_vals.push(low)
            close_vals.push(close)
            sma_vals.push(sma)
            rsi_vals.push(rsi)
        }
    }
}

export { date_vals, open_vals, high_vals, low_vals, close_vals, sma_vals, rsi_vals }