import React from 'react';
import Select from 'react-select';
import getSymbols from '../alpaca/data/symbols';
import { Line } from 'react-chartjs-2';
import { date_vals, sma_vals, rsi_vals } from './components/mapTaData'

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

const getTaData = (stock, ta_array) => {
  return ta_array[ta_array.indexOf(stock) + 1]
}

const getGraphData = (stock) => {
  return {
    labels: getTaData(stock, date_vals),
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
        label: 'SMA - Simple Moving Average',
        data: getTaData(stock, sma_vals),
      },
      {
        label: 'RSI - Relative Strength Index',
        data: getTaData(stock, rsi_vals),
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2',
      },
    ],
  }
}

export default class MultiAxisLine extends React.Component {
    state = {
        selectedOption: { value: "AAPL", label: "AAPL - Apple Inc." },
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            selectedOption = this.state.selectedOption.value,
        );
    };
    render() {
        const { selectedOption } = this.state;

        return (
            <div className='header'>
                <h1 className='title'>Simple Moving Average + Relative Strength Index</h1>
                <br></br>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={getSymbols()}
                />
                <br></br>
                <Line data={getGraphData(selectedOption.value)} options={line_options} />
            </div>
        );
    }
}
