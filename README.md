# React-Market-Analysis

- Demo: https://nasdaq-analysis.netlify.app/#/
- Blog posts about this app: https://kunal-patil.ghost.io/tag/algotrading/

### How to Run
- navigate to empty directory
- git clone https://github.com/HakunaKp/React-Market-Analysis.git
- npm install
- cd example
- npm install
- npm start
- These next steps are optional. Follow these steps to run the app with the latest stock market data:
- cd src
- cd alpaca
- python3 bars.py (Fetch latest stock data by the day. Includes commented code for auto-run and fetch stock data by the minute)
- python3 ta.py (Calculate technical indicator values based on data generated from bars.py)
- navigate back to 'example' folder
- npm start
