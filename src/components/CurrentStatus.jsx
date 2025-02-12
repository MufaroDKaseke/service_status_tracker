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
        {data && data[2] === false ? (
          <div className="alert alert-danger bg-danger text-white text-center fw-semibold" role="alert">
            <i className="bi bi-x-circle fs-6 me-2"></i>Offline
          </div>
        ) : (
          <div className="alert alert-success bg-success text-white fw-semibold d-flex align-items-center justify-content-center" role="alert">
            <i className="bi bi-check-circle fs-6 me-2"></i><span>All Systems Operational</span>
          </div>
        )}
    </section>
  )
}