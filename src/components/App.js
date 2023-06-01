import React, { useState, useEffect, useCallback} from 'react';
import NumberRolodex from './NumberRolodex';
import Alert from './Alert';
import { allTips } from '../tips/tipsData';

import './App.css';

function App() {
  const [currentNumber, setCurrentNumber] = useState('001');
  const [tips] = useState(allTips);
  const [title] = useState('The Pragmatic Programmer Tip Generator');
  const [btnText] = useState('Get A Random Tip');
  const [lowLimit] = useState('000');
  const [highLimit] = useState('100');
  const [alertTotalNumberWarning] = useState({ color: 'red', 
                                              msg:'There are 100 tips in the databank. Please choose a tip between 1 and 100 inclusive.'});
  const [footerInfo] = useState({ date: 'Copyright; 2020 ', 
                                  name: 'Sylvain Dessureault ',
                                  portfolioLink: 'https://sylvaindessureault.com',
                                  message: 'Built with love for all programmers out there.',
                                  copyrightNotice: 'All quotes and briefs taken from "The Pragmatic Programmer\n20th anniversary edition, Copyright David Thomas and Andrew Hunt.'
                                })

  const handleChangeNumber = useCallback((num)=>{
    setCurrentNumber(num)
  }, [setCurrentNumber])

  const generateRandomNumber = useCallback(()=>{
    return Math.floor(Math.random() * Number(highLimit));
  },[highLimit])

  const getRandomTipNumber = useCallback(()=>{
    let randomTipNumber;
    do {
      randomTipNumber = generateRandomNumber();
    } while (randomTipNumber < Number(lowLimit) || randomTipNumber > Number(highLimit));

    randomTipNumber =
      randomTipNumber !== Number(highLimit)
        ? randomTipNumber >= Number(highLimit) / 10
          ? `0${randomTipNumber.toString()}`
          : `00${randomTipNumber.toString()}`
        : randomTipNumber;
    handleChangeNumber(randomTipNumber);

  }, [lowLimit, highLimit, generateRandomNumber, handleChangeNumber])

  useEffect(()=>{
    getRandomTipNumber();
  }, [getRandomTipNumber]);

  const validateNumber = (num) => {
    return num > Number(lowLimit) && num <= Number(highLimit);
  };

  let currentTip, brief;
  let convertedNumber = Number(currentNumber);
  if (tips[convertedNumber - 1]) {
    currentTip = tips[convertedNumber - 1].tip;
    brief = tips[convertedNumber - 1].brief;
  }
  return (
    <>
      <div className="container">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="rolodex">
          <div className="number-container">
            <NumberRolodex
              number={validateNumber(currentNumber) ? currentNumber : lowLimit}
              changeNumber={(num) => handleChangeNumber(num)}
            />
          </div>
        </div>
        <div>
          <button
            className="action-btn disable-select"
            onClick={() => getRandomTipNumber()}
          >{btnText}</button>
        </div>
        {validateNumber(currentNumber) ? (
          <div className={'tip-block'}>
            <div id="tip">{currentTip}</div>
            <div id="brief">{brief}</div>
          </div>
        ) : (
          <Alert
            message={alertTotalNumberWarning.msg}
            color={alertTotalNumberWarning.color}
          />
        )}
        <div id="footer">
          <div className="dev-meta">
            <p>
              {footerInfo.date}
              <a
                href={footerInfo.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="item"
              >
                {footerInfo.name}
              </a>
            </p>
            {footerInfo.message}
          </div>
          <div className="authors-copyright">
            <p>{footerInfo.copyrightNotice}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;