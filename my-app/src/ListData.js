import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file for styling

const FetchData = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const jsonData = await response.json();
      setData(jsonData.data);
      setResults(jsonData.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    const filteredData = data.filter(item =>
      item.first_name.toLowerCase().includes(query.toLowerCase())
    );
    setQuery(query);
    setResults(filteredData);
  };

  return (
    <div className="container">
     <div className="search-bar" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input 
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by first name"
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: 'none',
            fontSize: '16px',
          }}
        />
        </div>


      <div className="results">
        {results.map(item => (
          <div key={item.id} className="result-item">
            <div className="circle">
              <span className="id">{item.id}</span>
              </div>

            <div className="content">
              <img src={item.avatar} alt={item.first_name} />
            </div>
            <div>
              <div className="first_name"><span className="first_name">{item.first_name}</span></div>
            
            </div>
          </div>
          
        ))}
      </div>
      <div className="first-names">
        {results.map(item => (
          <p key={item.id} className="first-name-outside">{item.first_name}</p>
        ))}
      </div>
    </div>
  );
}


export default FetchData;
