// Test.js
import React from 'react';
import Select from 'react-select';

const Test = () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  return (
    <div style={{ margin: '50px', width: '300px' }}>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Select an option..."
        isClearable
      />
    </div>
  );
};

export default Test;
