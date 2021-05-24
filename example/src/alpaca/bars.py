# bars.py
# scrapes most recent Invesco holding data
# generates js file of stock symbols and company names
# generates txt file of ohlc values
# includes code to run on a fixed schedule (commented)

import config, requests, json
import btalib
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
from threading import Timer

# Go to Invesco and download qqq holding data
url = 'https://www.invesco.com/us/financial-products/etfs/holdings/main/holdings/0?audienceType=Investor&action=download&ticker=QQQ'
r = requests.get(url, allow_redirects=True)
open('data/qqq.csv', 'wb').write(r.content)

# Get a list of stock symbols
holdings = open('data/qqq.csv').readlines()
symbols = [holding.split(',')[2].strip() for holding in holdings][1:]

# Create exportable js file of stock symbols and company names 
# TODO: Move to own .py file
#format_symbol = ""
#for symbol in symbols:
#    stock = yf.Ticker(str(symbol))
#    company_name = stock.info['longName']
#    if not ("'" in company_name):
#        symbol = "{ value: '" + symbol + "', label: '" + symbol + " - " + company_name + "' },\n\t\t"
#        format_symbol += symbol

# Remove final newline and comma
#length = len(format_symbol) - 4
#formatted = format_symbol[:length]

#symbol_file = open('data/symbols.js', "w+")
#symbol_file.write("export default function getSymbols() {\n\treturn (\n\t\t[" + formatted + "\n])};")
#symbol_file.close()

# For use with alpaca API
symbols = ",".join(symbols)

# Optional: Automatically update backtesting data every day after market closes (3PM CST). Leave script running
# x = datetime.today()
# y = x.replace(day=x.day, hour=3, minute=0, second=0, microsecond=0) + timedelta(days=1)
# delta_t = y - x

# secs = delta_t.total_seconds()

def get_bars():
    # Time frame options: 1Min, 5Min, 15Min, 1D
    # minute_bars_url = '{}/5Min?symbols={}&limit=1000'.format(config.BARS_URL, symbols)
    days_bars_url = '{}/day?symbols={}&limit=1000'.format(config.BARS_URL, symbols)

    r = requests.get(days_bars_url, headers=config.HEADERS)

    data = r.json()

    for symbol in data:

        # Regular Usage
        filename = 'data/ohlc/{}.txt'.format(symbol)
        f = open(filename, 'w+')
        f.write('Date, Open, High, Low, Close, Volume, Open Interest\n')

        for bar in data[symbol]:
            t = datetime.fromtimestamp(bar['t'])
            day = t.strftime('%Y-%m-%d')
            line = '{}, {}, {}, {}, {}, {}, {}\n'.format(day, bar['o'], bar['h'], bar['l'], bar['c'], bar['v'], 0.00)
            f.write(line)
        f.close()

        # For use with regex in ta.py
        filename = 'data/ohlc-regex/{}.txt'.format(symbol)
        f = open(filename, 'w+')
        f.write('Date, Open, High, Low, Close, Volume, Open Interest\n')

        for bar in data[symbol]:
            t = datetime.fromtimestamp(bar['t'])
            day = t.strftime('%Y-%m-%d')
            line = '{}, o-{}, h-{}, l-{}, c-{}, v-{}, oi-{}\n'.format(day, bar['o'], bar['h'], bar['l'], bar['c'], bar['v'], 0.00)
            f.write(line)
        f.close()

get_bars()
# t = Timer(secs, get_bars)
# t.start()
