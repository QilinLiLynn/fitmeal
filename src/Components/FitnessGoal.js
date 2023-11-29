import React, { useState } from 'react';

const DropdownMenu = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // Event handler for selecting an option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Select an option:</h2>
      {/* Dropdown menu */}
      <select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Display the selected option */}
      <p>You selected: {selectedOption}</p>
    </div>
  );
};

export default DropdownMenu;
