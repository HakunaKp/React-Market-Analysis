import { date_vals, open_vals, high_vals, low_vals, close_vals, sma_vals, rsi_vals } from './MapTaData'
import getArrayData from './GetArrayData'

export default function getGraphData(stock, interval) {
    return {
        labels: getArrayData(stock, date_vals, interval),
        datasets: [
          {
            type: 'bar',
            label: 'Open',
            data: getArrayData(stock, open_vals, interval),
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            type: 'bar',
            label: 'High',
            data: getArrayData(stock, high_vals, interval),
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            type: 'bar',
            label: 'Low',
            data: getArrayData(stock, low_vals, interval),
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            type: 'bar',
            label: 'Close',
            data: getArrayData(stock, close_vals, interval),
            backgroundColor: '#B284BE',
          },
          {
            type: 'line',
            label: 'SMA - Simple Moving Average',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            fill: false,
            data: getArrayData(stock, sma_vals, interval),
            yAxisID: 'y-axis-1',
          },
          {
            type: 'line',
            label: 'RSI - Relative Strength Index',
            backgroundColor: 'rgb(255, 99, 132)',
            data: getArrayData(stock, rsi_vals, interval),
            borderColor: 'white',
            borderWidth: 2,
            yAxisID: 'y-axis-2',
          },
        ],
    }
}