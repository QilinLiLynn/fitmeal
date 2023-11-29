import React, { useState } from 'react';
import GridCell from './GridCell';

const Calendar = () => {
  // Initial calendar data (you can replace it with your data structure)
  const [calendarData, setCalendarData] = useState(Array(7).fill(Array(7).fill('')));

  // Function to handle data input for a specific grid cell
  const handleDataInput = (row, col, newData) => {
    setCalendarData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[row] = [...newDataArray[row]];
      newDataArray[row][col] = [...newDataArray[row][col], newData];
      return newDataArray;
    });
  };

  return (
    <div>
      <h2>Calendar Grid</h2>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellData, colIndex) => (
                <td key={colIndex}>
                  <GridCell
                    row={rowIndex}
                    col={colIndex}
                    data={cellData}
                    onDataInput={handleDataInput}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
