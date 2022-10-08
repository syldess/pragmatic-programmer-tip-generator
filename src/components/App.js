import React from 'react';
import NumberRolodex from './NumberRolodex';
import Alert from './Alert';
import { allTips } from '../tips/tipsData';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '001',
      tips: allTips,
    };
  }

  handleChangeNumber(num) {
    this.setState({ ...this.state, number: num });
  }

  getTip = () => {
    console.log('getting tip');
    console.log(this.state.number);
  };

  getRandomTip = () => {
    let randomTip = Math.floor(Math.random() * 100);
    randomTip =
      randomTip !== 100
        ? randomTip > 10
          ? `0${randomTip.toString()}`
          : `00${randomTip.toString()}`
        : randomTip;
    console.log('getting random tip: ' + randomTip);
    this.handleChangeNumber(randomTip);
  };

  validateNumber = () => {
    return this.state.number > 0 && this.state.number <= 100;
  };

  componentDidMount() {
    this.getRandomTip();
  }

  render() {
    const { number, tips } = this.state;
    let tip, brief;
    let convertedNumber = Number(number);
    if (tips[convertedNumber - 1]) {
      tip = tips[convertedNumber - 1].tip;
      brief = tips[convertedNumber - 1].brief;
    }
    return (
      <>
        <div className="container">
          <div className="title">
            <h1>The Pragmatic Programmer Tip Generator</h1>
          </div>
          <div className="rolodex">
            <div className="number-container">
              <NumberRolodex
                number={this.validateNumber() ? number : '000'}
                changeNumber={(num) => this.handleChangeNumber(num)}
              />
            </div>
          </div>
          <div>
            <button
              className="action-btn disable-select"
              onClick={() => this.getRandomTip()}
            >
              Get A Random Tip
            </button>
          </div>
          {this.validateNumber() ? (
            <div className={'tip-block'}>
              <div id="tip">{tip}</div>
              <div id="brief">{brief}</div>
            </div>
          ) : (
            <Alert
              message={
                'There are 100 tips in the databank. Please choose a tip between 1 and 100 inclusive.'
              }
              color={'red'}
            />
          )}
          <div id="footer">
            <div className="dev-meta">
              <p>
                &copy; 2020
                <a
                  href="https://github.com/syldess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item"
                >
                  {' '}
                  Sylvain Dessureault
                </a>
              </p>
              Built with love for all programmers out there.
            </div>
            <div className="authors-copyright">
              <p>All quotes and briefs taken from "The Pragmatic Programmer"</p>
              <p>
                20th anniversary edition, &copy; David Thomas and Andrew Hunt.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
