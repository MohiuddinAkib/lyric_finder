import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="Loaing.."
      style={{ margin: '40px auto', display: 'block' }}
    />
  );
};

export default Spinner;
