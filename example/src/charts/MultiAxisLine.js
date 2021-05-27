import React from 'react';
import Select from 'react-select';
import getSymbols from '../alpaca/data/symbols';
import { Line } from 'react-chartjs-2';
import { date_vals, sma_vals, rsi_vals } from './components/MapTaData'
import interval_options from './components/IntervalOptions'
import getTaData from './components/GetArrayData'
import Button from './components/Button'

const line_options = {
  scales: {
    yAxes: [
    {
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
    },
    {
      type: 'linear',
      display: true,
      position: 'right',
      id: 'y-axis-2',
      gridLines: {
      drawOnArea: false,
      },
    },
    ],
  },
};

const getGraphData = (stock, interval) => {
  return {
    labels: getTaData(stock, date_vals, interval),
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
        label: 'SMA - Simple Moving Average',
        data: getTaData(stock, sma_vals, interval),
      },
      {
        label: 'RSI - Relative Strength Index',
        data: getTaData(stock, rsi_vals, interval),
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2',
      },
    ],
  }
}

export default class MultiAxisLine extends React.Component {
    state = {
        selectedStock: { value: "AAPL", label: "AAPL - Apple Inc." },
        selectedInterval: { value: "day_21", label: "1 Day Intervals - 1 Month Period" },
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
                <h1 className='title'>Simple Moving Average + Relative Strength Index</h1>
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
                <Line data={getGraphData(selectedStock.value, selectedInterval.value)} options={line_options} />
            </div>
        );
    }
}
