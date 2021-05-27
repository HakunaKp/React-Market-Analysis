import React from 'react';
import Select from 'react-select';
import getSymbols from '../alpaca/data/symbols';
import { Bar } from 'react-chartjs-2';
import Button from './components/Button'
import getIntervals from './components/IntervalOptions'
import getGraphData from './components/GetGraphData'

const options = {
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

export default class Selection extends React.Component {
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
                <h1 className='title'>OHLC Bars + SMA + RSI</h1>
                <Button />
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
                options={getIntervals}
                />
                <br></br>
                <Bar data={getGraphData(selectedStock.value, selectedInterval.value)} options={options}/>
            </div>
        );
    }
}