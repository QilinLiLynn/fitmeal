import React, { useState } from 'react';

const GridCell = ({ row, col, data, onDataInput }) => {
  const [inputData, setInputData] = useState('');

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    onDataInput(row, col, inputData);
    setInputData('');
  };

  return (
    <div>
      <div>Data: {data}</div>
      <form onSubmit={handleInputSubmit}>
        <input type="text" value={inputData} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GridCell;
