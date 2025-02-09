import React, { useEffect, useState } from 'react';

export default function History() {
  const [data, setData] = useState(null);
  const [additionalData, setAdditionalData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/data/all/31d')
      .then(response => response.json())
      .then(data => {
        setData(data);
        data.forEach(item => {
          if (item[1] === 0) {
            fetch(`http://localhost:3000/api/data/${item[0]}`)
              .then(response => response.json())
              .then(additionalData => {
                setAdditionalData(prevState => ({
                  ...prevState,
                  [item[0]]: additionalData
                }));
              })
              .catch(error => console.error('Error fetching additional data:', error));
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="history">
      <p className="text-end small">{data ? JSON.stringify(data) : 'Loading...'}</p>
      <ul className="list-group text-start">
        <li className="category list-group-item">
          <div className="d-flex justify-content-between">
            <h6 className="category-title">Title</h6><small className="lead text-success fs-6">Operational</small>
          </div>
          <div className="d-flex"> 
            {data && data.map((item, index) => (
              <div
                key={index}
                className={`category-day ${item[1] === 1 ? 'bg-success' : 'bg-danger'}`}
              >
                <div className="category-day-tooltip border p-2">
                  <h6>{item[0]}</h6>
                  <p>{item[3]}ms</p>
                  {item[1] === 0 && additionalData[item[0]] && (
                    <p>{JSON.stringify(additionalData[item[0]])}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <small className="lead fs-6">30days</small>
            <hr className="w-100 bg-dark mx-3"></hr>
            <small className="lead fs-6">15days</small>
            <hr className="w-100 bg-dark mx-3"></hr>
            <small className="lead fs-6">Today</small>
          </div>
        </li>
      </ul>
    </section>
  );
}