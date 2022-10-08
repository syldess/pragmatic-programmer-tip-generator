import React from 'react';
import DigitFlipper from './DigitFlipper';

const NumberRolodex = (props) => {
  const { number, changeNumber } = props;

  const increase = (pos, number) => {
    const increasedDigit = Number(number[pos]) + 1;
    const increasedNumber = number
      .slice(0, pos)
      .concat(increasedDigit < 10 ? increasedDigit : '0')
      .concat(number.slice(pos + 1));
    return increasedNumber;
  };

  const decrease = (pos, number) => {
    const decreasedDigit = Number(number[pos]) - 1;
    const decreasedNumber = number
      .slice(0, pos)
      .concat(decreasedDigit >= 0 ? decreasedDigit : '9')
      .concat(number.slice(pos + 1));
    return decreasedNumber;
  };

  const populateRolodex = () => {
    let allDigits = [];
    for (let i = 0; i < number.length; i++) {
      allDigits.push(
        <DigitFlipper
          digit={number[i]}
          increase={() => changeNumber(increase(i, number))}
          decrease={() => changeNumber(decrease(i, number))}
          key={i}
        />
      );
    }
    return allDigits.map((digit) => digit);
  };

  return <>{populateRolodex()}</>;
};

export default NumberRolodex;
