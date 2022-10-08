import React from 'react';

const Alert = ({ message, color }) => {
  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        backgroundColor: 'black',
        padding: '1rem',
        color,
        fontSize: '1.2rem',
        borderRadius: '15px',
        margin: '50px',
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
