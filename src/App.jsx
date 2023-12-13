import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [status, setStatus] = useState('All');
  const [allData, setAllData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleStatusChange = (e, index) => {
    const newData = [...allData];
    newData[index].status = e.target.value;
    setAllData(newData);
  };

  const handleAddButtonClick = () => {
    if (editMode) {
      const editedData = { ...allData[editIndex], input1, input2 };
      const newData = [...allData];
      newData[editIndex] = editedData;
      setAllData(newData);
      setEditMode(false);
      setEditIndex(null);
      setInput1('');
      setInput2('');
    } else {
      if (input1.trim() !== '' && input2.trim() !== '') {
        const newData = {
          input1: input1,
          input2: input2,
          status: status,
        };

        setAllData((prevData) => [...prevData, newData]); // Using functional update to preserve previous data
        setInput1('');
        setInput2('');
      } else {
        alert('Please fill in both input fields.');
      }
    }
  };

  const handleDeleteButtonClick = (index) => {
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);
  };

  const handleEditButtonClick = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setInput1(allData[index].input1);
    setInput2(allData[index].input2);
    setStatus(allData[index].status);
  };

  const filterData = () => {
    if (status === 'All') {
      return allData;
    } else {
      return allData.filter((data) => data.status === status);
    }
  };

  return (
    <div>
      <h1> My Todos </h1>
      <div className='Input-container'>
      <div >
        {/* <label>I:</label> */}
        <input type="text" value={input1} onChange={handleInput1Change} />
      </div>
      <div>
        {/* <label>Input 2:</label> */}
        <input type="text" value={input2} onChange={handleInput2Change} />
      </div>
      <button  className = "Addbtn" onClick={handleAddButtonClick}>
        {editMode ? 'Save' : 'Add'}
      </button>
      </div>
      <div className='section-container'>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
     

      <div className='data-container'>
        <h3>My Todos:</h3>
        {allData.length > 0 ? (
          <div className="card-container">
            {filterData().map((data, index) => (
              <div className="card" key={index}>
                
                <p>
                  <strong>Name:</strong> {data.input1}
                </p>
                <p>
                  <strong>Description:</strong> {data.input2}
                </p>
                <div>
                  <strong>Status Filter: </strong>
                  <span>{data.status}</span>
                </div>
                <div className='btn-container'> 
                  <button className='Editbtn' onClick={() => handleEditButtonClick(index)}>
                    Edit
                  </button>
                  <button className='deletebtn' onClick={() => handleDeleteButtonClick(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default App;
