import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <div className='header'>
      <h1 className='title'>Nasdaq Stock Market Analysis</h1>
      <h2 className='subtitle'>OHLC & Technical Indicators - Visualized</h2>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/HakunaKp/'
        >
          GitHub
        </a>
        <a
          className='btn btn-npm'
          href='https://alpaca.markets/'
        >
          Alpaca
        </a>
        <a 
          className='btn btn-chartjs' 
          href='https://www.chartjs.org'
        >
          Chart.js
        </a>
      </div>
    </div>
    <hr />
    <div className='categories'>
      <div className='category'>
        <h3 className='title'>OHLC Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/grouped-bar'>Grouped OHLC Bar Chart</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Technical Indicators</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/multi-axis-line'>Grouped SMA & RSI</Link>
          </li>
          <li className='entry'>
            <Link to='/multi'>Grouped OHLC Bars, SMA & RSI</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Trading Strategies</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/momentum'>Momentum</Link>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div className='footer'>
      <h6>
        <a href='https://kunal-patil.ghost.io'>
          Kunal Patil
        </a>
      </h6>
    </div>
  </>
);

export default Home;
