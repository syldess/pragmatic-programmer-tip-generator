import React from 'react';

const DigitFlipper = (props) => {
  const { increase, decrease, digit } = props;
  return (
    <>
      <div className="digit-container disable-select">
        <div className="number" id="top" onClick={increase}></div>
        {digit}
        <div className="number" id="bottom" onClick={decrease}></div>
      </div>
    </>
  );
};

export default DigitFlipper;
