import React from 'react';
import Select from 'react-select';
import getSymbols from '../alpaca/data/symbols';
import { Bar } from 'react-chartjs-2';
import { date_vals, open_vals, high_vals, low_vals, close_vals } from './components/mapTaData'

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

const getTaData = (stock, ta_array) => {
  return ta_array[ta_array.indexOf(stock) + 1]
}

const getGraphData = (stock) => {
  return {
    labels: getTaData(stock, date_vals),
    datasets: [
      {
        label: 'Open',
        data: getTaData(stock, open_vals),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'High',
        data: getTaData(stock, high_vals),
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Low',
        data: getTaData(stock, low_vals),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Close',
        data: getTaData(stock, close_vals),
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  }
}

export default class GroupedBar extends React.Component {
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
              <h1 className='title'>Grouped OHLC Bar Chart</h1>
              <br></br>
              <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={getSymbols()}
              />
              <br></br>
              <Bar data={getGraphData(selectedOption.value)} options={bar_options} />
          </div>
      );
  }
}