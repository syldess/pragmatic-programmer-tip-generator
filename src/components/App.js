import React, { useState, useEffect, useCallback} from 'react';
import NumberRolodex from './NumberRolodex';
import Alert from './Alert';
import { allTips } from '../tips/tipsData';

import './App.css';

function App() {
  const [number, setNumber] = useState('001');
  const [tips] = useState(allTips);

  const handleChangeNumber = useCallback((num)=>{
    setNumber(num)
  }, [setNumber])

  const getRandomTipNumber = useCallback(()=>{
    let randomTipNumber = Math.floor(Math.random() * 100);
    randomTipNumber =
      randomTipNumber !== 100
        ? randomTipNumber > 10
          ? `0${randomTipNumber.toString()}`
          : `00${randomTipNumber.toString()}`
        : randomTipNumber;
    handleChangeNumber(randomTipNumber);

  }, [handleChangeNumber])

  useEffect(()=>{
    getRandomTipNumber();
  }, [getRandomTipNumber]);

  const validateNumber = () => {
    return number > 0 && number <= 100;
  };

  let currentTip, brief;
  let convertedNumber = Number(number);
  if (tips[convertedNumber - 1]) {
    currentTip = tips[convertedNumber - 1].tip;
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
              number={validateNumber() ? number : '001'}
              changeNumber={(num) => handleChangeNumber(num)}
            />
          </div>
        </div>
        <div>
          <button
            className="action-btn disable-select"
            onClick={() => getRandomTipNumber()}
          >
            Get A Random Tip
          </button>
        </div>
        {validateNumber() ? (
          <div className={'tip-block'}>
            <div id="tip">{currentTip}</div>
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

export default App;