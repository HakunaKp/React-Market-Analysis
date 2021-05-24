# ta.py
# script which generates json files of technical indicator data

import btalib
import pandas as pd
import json
import re

# Get a list of stock symbols
holdings = open('data/qqq.csv').readlines()
symbols = [holding.split(',')[2].strip() for holding in holdings][1:]
    
for symbol in symbols:
    
    # Read a csv file into a pandas dataframe
    df = pd.read_csv('data/ohlc/' + symbol + '.txt', parse_dates=True, index_col='Date')

    # Simple moving average of recent nearest 3 closing prices
    sma = btalib.sma(df, period=3)
    rsi = btalib.rsi(df)

    df['sma'] = sma.df
    df['rsi'] = rsi.df

    macd = btalib.macd(df)

    df['macd'] = macd.df['macd']
    df['signal'] = macd.df['signal']
    df['histogram'] = macd.df['histogram']

    oversold_days = df[df['rsi'] < 30]

    overbought_days = df[df['rsi'] > 70]

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
        #date_time_pattern = r'\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d'
        date_pattern = r'\d\d\d\d-\d\d-\d\d'
        dates = re.findall(date_pattern, date_string)
        return dates

    def format_ohlc(string, pattern):
        values = []
        filename = 'data/ohlc-regex/{}.txt'.format(symbol)
        f = open(filename, 'r')
        lines = f.readlines()
        for line in lines[1:]:
            line.strip()
            value = re.findall(pattern, line)
            if value:
                values.append(value[0][2:])
        f.close()
        return values

    df_string = df.to_string()
    sma_string = df['sma'].to_string()
    rsi_string = df['rsi'].to_string()

    open_pattern = r'(o-\d+.\d+)'
    high_pattern = r'(h-\d+.\d+)'
    low_pattern = r'(l-\d+.\d+)'
    close_pattern = r'(c-\d+.\d+)'
    
    stock_ta = {
        'date': format_date(sma_string),
        'open': format_ohlc(df_string, open_pattern),
        'high': format_ohlc(df_string, high_pattern),
        'low': format_ohlc(df_string, low_pattern),
        'close': format_ohlc(df_string, close_pattern),
        'sma': format_price(sma_string),
        'rsi': format_price(rsi_string)
    }

    filename = 'data/ta/' + symbol + '.json'
    with open(filename, 'w+') as json_file:
        json.dump(stock_ta, json_file)
