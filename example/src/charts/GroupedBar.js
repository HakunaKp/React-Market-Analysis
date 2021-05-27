import React from 'react';
import Select from 'react-select';
import getSymbols from '../alpaca/data/symbols';
import { Bar } from 'react-chartjs-2';
import { date_vals, open_vals, high_vals, low_vals, close_vals } from './components/MapTaData'
import interval_options from './components/IntervalOptions'
import getOHLCData from './components/GetArrayData.js'
import Button from './components/Button'

const bar_options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const getGraphData = (stock, interval) => {
  return {
    labels: getOHLCData(stock, date_vals, interval),
    datasets: [
      {
        label: 'Open',
        data: getOHLCData(stock, open_vals, interval),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'High',
        data: getOHLCData(stock, high_vals, interval),
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Low',
        data: getOHLCData(stock, low_vals, interval),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Close',
        data: getOHLCData(stock, close_vals, interval),
        backgroundColor: '#B284BE',
      },
    ],
  }
}

export default class GroupedBar extends React.Component {
  state = {
      selectedStock: { value: "AAPL", label: "AAPL - Apple Inc." },
      selectedInterval: { value: "15Min_26", label: "15 Minute Intervals - 1 Day Period" }
    };
    handleChangeStock = (selectedStock) => {
        this.setState({ selectedStock }, () =>
            selectedStock = this.state.selectedStock.value,
        );
    };
    handleChangeInterval = (selectedInterval) => {
      this.setState({ selectedInterval }, () =>
          selectedInterval = this.state.selectedInterval.value,
      );
    };
  render() {
      const { selectedStock, selectedInterval } = this.state;

      return (
          <div className='header'>
              <h1 className='title'>Grouped OHLC Bar Chart</h1>
              <Button/>
              <br></br>
              <Select
              value={selectedStock}
              onChange={this.handleChangeStock}
              options={getSymbols()}
              />
              <br></br>
              <Select
              value={selectedInterval}
              onChange={this.handleChangeInterval}
              options={interval_options}
              />
              <br></br>
              <Bar data={getGraphData(selectedStock.value, selectedInterval.value)} options={bar_options} />
          </div>
      );
  }
}