import React, { useEffect, useState } from 'react';

export default function History() {
  const [data, setData] = useState(null);
  const [additionalData, setAdditionalData] = useState({});

  const getLocaleTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/data/all/30d?timezone=${getLocaleTimezone()}`)
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
      <p className="text-end text-secondary">{data ? `History for last ${data.length} days` : 'Loading...'}</p>
      <ul className="list-group text-start">
        <li className="category list-group-item">
          <div className="d-flex justify-content-between">
            <h6 className="category-title">Website</h6><small className={`lead text-${data && data[data.length - 1][1] === 1 ? 'success' : 'danger'} fs-6`}>{data && data[data.length - 1][1] === 1 ? 'Operational' : 'Offline'}</small>
          </div>
          <div className="d-flex"> 
            {data && data.map((item, index) => (
              <div
                key={index}
                className={`category-day ${item[1] === 1 ? 'bg-success' : 'bg-danger'}`}
              >
                <div className={`category-tooltip border ${item[1] === 1 ? 'border-success' : 'border-danger'} rounded p-2`}>
                  <strong className='category-tooltip-date'>{item[0]}</strong>
                  <p className='category-tooltip-latency'>{item[3]}ms</p>
                  {item[1] === 0 && additionalData[item[0]] ? (
                    <p className='bg-secondary py-1 px-2 rounded'><i className="bi bi-exclamation-triangle text-warning me-2"></i>
                    {additionalData[item[0]][1]}
                    </p>
                  ) : (
                    <p>No issues detected</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <small className="text-muted fs-6">30days</small>
            <hr className="w-100 border-black mx-3"></hr>
            <small className="text-muted fs-6">15days</small>
            <hr className="w-100 border-black mx-3"></hr>
            <small className="text-muted fs-6">Today</small>
          </div>
        </li>
      </ul>
    </section>
  );
}