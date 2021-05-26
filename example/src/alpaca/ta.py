# ta.py
# script which generates json files of technical indicator data

import btalib
import pandas as pd
import json
import re
import os

# Get a list of stock symbols
holdings = open('data/qqq.csv').readlines()
symbols = [holding.split(',')[2].strip() for holding in holdings][1:]

def format_price(price_string):
    price_pattern = r'(\d+.\d+\n|NaN)'
    price_list = re.findall(price_pattern, price_string)
    price = []
    # split the string at '\n'
    for price_nl in price_list:
        step_1 = price_nl.split('\n')
        price.append(step_1[0])
    return price
    
def format_date(date_string):
    date_time_pattern = r'\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d'
    #date_pattern = r'\d\d\d\d-\d\d-\d\d'
    dates = re.findall(date_time_pattern, date_string)
    return dates

def format_ohlc(string, pattern, symbol, interval):
    values = []
    filename = 'data/ohlc-regex/{}/{}.txt'.format(symbol, interval)
    f = open(filename, 'r')
    lines = f.readlines()
    for line in lines[1:]:
        line.strip()
        value = re.findall(pattern, line)
        if value:
            values.append(value[0][2:])
    f.close()
    return values
    
def get_ta_data(intervals):
    for symbol in symbols:
        for interval in intervals:
            # Read a csv file into a pandas dataframe
            df = pd.read_csv('data/ohlc/' + symbol + '/' + interval + '.txt', parse_dates=True, index_col='Date')

            # Simple moving average of recent nearest 3 closing prices
            sma = btalib.sma(df, period=3)
            rsi = btalib.rsi(df)

            df['sma'] = sma.df
            df['rsi'] = rsi.df

        #    macd = btalib.macd(df)

        #    df['macd'] = macd.df['macd']
        #    df['signal'] = macd.df['signal']
        #    df['histogram'] = macd.df['histogram']

            oversold_days = df[df['rsi'] < 30]

            overbought_days = df[df['rsi'] > 70]

            df_string = df.to_string()
            sma_string = df['sma'].to_string()
            rsi_string = df['rsi'].to_string()

            open_pattern = r'(o-\d+.\d+)'
            high_pattern = r'(h-\d+.\d+)'
            low_pattern = r'(l-\d+.\d+)'
            close_pattern = r'(c-\d+.\d+)'
            
            stock_ta = {
                'date': format_date(sma_string),
                'open': format_ohlc(df_string, open_pattern, symbol, interval),
                'high': format_ohlc(df_string, high_pattern, symbol, interval),
                'low': format_ohlc(df_string, low_pattern, symbol, interval),
                'close': format_ohlc(df_string, close_pattern, symbol, interval),
                'sma': format_price(sma_string),
                'rsi': format_price(rsi_string)
            }

            # Leaf directory 
            directory = symbol
            # Parent Directories 
            parent_dir = 'data/ta'
            # Paths
            path = os.path.join(parent_dir, directory) 
            os.makedirs(path, exist_ok=True)

            filename = 'data/ta/' + symbol + '/' + interval + '.json'
            with open(filename, 'w+') as json_file:
                json.dump(stock_ta, json_file)

intervals = ("1Min_390", "1Min_1000", "5Min_78", "5Min_390", "5Min_780", "15Min_26", "15Min_130",
 "15Min_260", "15Min_546", "day_21", "day_63", "day_126", "day_252", "day_504", "day_756")
get_ta_data(intervals)
