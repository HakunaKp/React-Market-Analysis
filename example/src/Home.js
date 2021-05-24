import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <div className='header'>
      <h1 className='title'>Nasdaq Stock Market Analysis</h1>
      <h2 className='subtitle'>OHLC & Technical Indicators - Visualized</h2>
      <div className='links'>
        <a
          className='btn btn-npm'
          href='https://github.com/HakunaKp/Stock-Analysis-Algotrading-Bot'
        >
          Alpaca
        </a>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2'
        >
          Project
        </a>
        <a className='btn btn-chartjs' href='https://www.chartjs.org'>
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
        <h3 className='title'>Technical Indicator Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/multi-axis-line'>Grouped SMA + RSI Line Chart</Link>
          </li>
        </ul>
      </div>
      {/*<div className='category'>
        <h3 className='title'>Advanced Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/dynamic-bar'>Dynamic</Link>
          </li>
          <li className='entry'>
            <Link to='/multi'>Multi Type</Link>
          </li>
          <li className='entry'>
            <Link to='/crazy'>Crazy</Link>
          </li>
        </ul>
      </div>*/}
      {/*<div className='category'>
        <h3 className='title'>Events</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/click-events'>Click Events</Link>
          </li>
        </ul>
      </div>*/}
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
