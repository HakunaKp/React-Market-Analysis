import json
import pandas
import os

holdings = open('../alpaca/data/qqq.csv').readlines()
symbols = [holding.split(',')[2].strip() for holding in holdings][1:]
intervals = ("1Min_390", "1Min_1000", "5Min_78", "5Min_390", "5Min_780", "15Min_26", "15Min_130",
 "15Min_260", "15Min_546", "day_21", "day_63", "day_126", "day_252", "day_504", "day_756")

def make_dirs(symbol, parent):
    # TODO: Move these into a function
    # Leaf directory 
    directory = symbol
    # Parent Directories 
    parent_dir = parent
    # Paths
    path = os.path.join(parent_dir, directory) 
    os.makedirs(path, exist_ok=True)
    
for symbol in symbols:
    for interval in intervals:

        training_file = open('../alpaca/data/ta/' + symbol + '/' + interval + '.json',)
        training_data = json.load(training_file)
        date_vals = []
        sma_vals = []
        training_set_length = len(training_data['sma'])
        index = 0

        for i in training_data['date']:
            if index < training_set_length:
                date_vals.append(i)
                index+=1

        index = 0
        for i in training_data['sma']:
            if index < training_set_length:
                sma_vals.append(i)
                index+=1

        training_file.close()

        # Loop data set, for each item create a dictionary of decision (BUY, SELL, or HOLD) and closing price value
        # DECISION RULES:
        # If the next trend is Uptrend, then the decision is BUY
        # If BUY decision already exists, then HOLD
        # If the next trend is Downtrend, then the decision is SELL
        # If SELL decision already exists, then HOLD

        prev_val = 0
        index = 0
        decision = "HOLD"
        decision_vals = []
        for i in sma_vals:
            if i != 'NaN':
                parsed_val = float(i)
                # UPTREND
                if (parsed_val > prev_val):
                    # If the next trend is Uptrend, then the decision is BUY
                    if decision != "BUY":
                        decision = "BUY"
                    # If BUY decision already exists, then HOLD
                    elif decision == "BUY":
                        decision = "HOLD"
                # DOWNTREND
                elif (parsed_val < prev_val):
                    # If the next trend is Downtrend, then the decision is SELL
                    if decision != "SELL":
                        decision = "SELL"
                    # If SELL decision already exists, then HOLD
                    elif decision == "SELL":
                        decision = "HOLD"
                decision_val = {
                    "date": date_vals[index],
                    "price": parsed_val,
                    "decision": decision
                }
                decision_vals.append(decision_val)
                prev_val = parsed_val
                index+=1

        starting_cash = 100000
        cash = starting_cash
        profit = 0
        num_vals = len(decision_vals)
        realtime_price = float(sma_vals[num_vals-1])
        start_date = date_vals[0]
        end_date = date_vals[num_vals-1]
        holdings = []
        holding_total = 0
        i = 0

        make_dirs(symbol, 'tables')
        make_dirs(symbol, 'summaries')

        filename = 'tables/' + symbol + '/' + interval + 'DecisionTable.txt'
        with open(filename, 'w+') as f:
            f.write('Date, Price, Decision, Cash Balance, Holding Balance, Flip, Total Profit\n')

            while (i < num_vals):
                cur_date = decision_vals[i]['date']
                cur_price = decision_vals[i]['price']
                cur_decision = decision_vals[i]['decision']
                flip = 0

                if cur_decision == 'BUY':
                    cash -= cur_price
                    holdings.append(cur_price)
                    holding_total += cur_price
                elif cur_decision == 'SELL':
                    j = 0
                    length = len(holdings)
                    while (j < length):
                        flip = cur_price - holdings[j]
                        cash += cur_price
                        profit += flip
                        j+=1
                    holdings = []
                    holding_total = 0
                line = '{}, ${:,.2f}, {}, ${:,.2f}, ${:,.2f}, ${:,.2f}, ${:,.2f}\n'.format(cur_date, cur_price, cur_decision, cash, holding_total, flip, profit)
                f.write(line)
                i+=1

        filename = 'summaries/' + symbol + '/' + interval + 'DecisionSummary.txt'
        with open(filename, 'w+') as f:
            asset_value = cash + holding_total
            percent_change = ((asset_value - starting_cash)/starting_cash) * 100

            f.write('Beginning Cash Balance = ${:,.2f}'.format(starting_cash))
            f.write('\nEnding Cash Balance = ${:,.2f}'.format(cash))
            f.write('\nEnding Holding Balance = ${:,.2f}'.format(holding_total))
            f.write('\nEnding Total Assets =  ${:,.2f}'.format(cash + holding_total))
            f.write('\nEnding Total Profit =  ${:,.2f}'.format(profit))
            if percent_change > 0:
                f.write('\nEnding Percent Change =  +{:,.2f}%'.format(percent_change))
            else:
                f.write('\nEnding Percent Change =  -{:,.2f}%'.format(percent_change))
            f.write('\nPeriod: {} - {}'.format(start_date, end_date))