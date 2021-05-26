# bars.py
# scrapes most recent Invesco holding data
# generates js file of stock symbols and company names
# generates txt file of ohlc values
# includes code to run on a fixed schedule (commented)

import config, requests, json
import btalib
import pandas as pd
import yfinance as yf
import os 
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

def get_bars(interval, limit):
    # Time frame options: 1Min, 5Min, 15Min, 1D
    # minute_bars_url = '{}/5Min?symbols={}&limit=1000'.format(config.BARS_URL, symbols)
    bars_url = '{}/{}?symbols={}&limit={}'.format(config.BARS_URL, interval, symbols, limit)

    r = requests.get(bars_url, headers=config.HEADERS)

    data = r.json()
    for symbol in data:
        # Leaf directory 
        directory = symbol
        # Parent Directories 
        parent_dir = 'data/ohlc'
        parent_dir_regex = 'data/ohlc-regex'
        # Paths
        path = os.path.join(parent_dir, directory) 
        os.makedirs(path, exist_ok=True)

        path_regex = os.path.join(parent_dir_regex, directory) 
        os.makedirs(path_regex, exist_ok=True) 

        # Regular Usage
        filename = 'data/ohlc/{}/{}_{}.txt'.format(symbol, interval, limit)
        f = open(filename, 'w+')
        f.write('Date, Open, High, Low, Close, Volume, Open Interest\n')

        for bar in data[symbol]:
            t = datetime.fromtimestamp(bar['t'])
            day = t.strftime('%Y-%m-%d %H:%M:%S')
            line = '{}, {}, {}, {}, {}, {}, {}\n'.format(day, bar['o'], bar['h'], bar['l'], bar['c'], bar['v'], 0.00)
            f.write(line)
        f.close()

        # For use with regex in ta.py
        filename = 'data/ohlc-regex/{}/{}_{}.txt'.format(symbol, interval, limit)
        f = open(filename, 'w+')
        f.write('Date, Open, High, Low, Close, Volume, Open Interest\n')

        for bar in data[symbol]:
            t = datetime.fromtimestamp(bar['t'])
            day = t.strftime('%Y-%m-%d')
            line = '{}, o-{}, h-{}, l-{}, c-{}, v-{}, oi-{}\n'.format(day, bar['o'], bar['h'], bar['l'], bar['c'], bar['v'], 0.00)
            f.write(line)
        f.close()

# Calculate day intervals
get_bars('day', 756) # get daily ohlc data for three full trading years
get_bars('day', 504) # get daily ohlc data for two full trading years
get_bars('day', 252) # get daily ohlc data for one full trading year
get_bars('day', 126) # get daily ohlc data for half a trading year
get_bars('day', 63) # get daily ohlc data for past three months
get_bars('day', 21) # get daily ohlc data for past month
get_bars('day', 10) # get daily ohlc data for past two weeks
get_bars('day', 5) # get daily ohlc data for past week
get_bars('day', 3) # get daily ohlc data for past three days
get_bars('day', 1) # get daily ohlc data for past day

# Calculate 15 minute intervals
get_bars('15Min', 26) # get ohlc data in 15 minute intervals for past full trading day
get_bars('15Min', 130) # get ohlc data in 15 minute intervals for past trading week
get_bars('15Min', 260) # get ohlc data in 15 minute intervals for past two trading weeks
get_bars('15Min', 546) # get ohlc data in 15 minute intervals for past 30 trading days

# Calculate 5 minute intervals
get_bars('5Min', 78) # get ohlc data in 5 minute intervals for past full trading day
get_bars('5Min', 390) # get ohlc data in 5 minute intervals for past trading week
get_bars('5Min', 780) # get ohlc data in 5 minute intervals for past two trading weeks

# Calculate 1 minute intervals
get_bars('1Min', 390) # get ohlc data in 1 minute intervals for past full trading day
get_bars('1Min', 1000) # get ohlc data in 1 minute intervals for past ~2.5 trading days

# t = Timer(secs, get_bars)
# t.start()
