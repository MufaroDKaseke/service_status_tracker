import React, { useEffect, useState } from 'react';

export default function CurrentStatus() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/data/latest')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching current status:', error));
  }, [])
  
  return (
    <section className="current py-3">
      <div className={`alert ${data && data[2] === false ? 'alert-danger bg-danger' : 'alert-success bg-success'} text-white text-center fw-bold`} role="alert">
        {data && data[2] === false ? 'Offline' : 'All Systems Operational'}
      </div>
    </section>
  )
}