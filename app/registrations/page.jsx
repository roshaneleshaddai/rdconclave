'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for proper styling


const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);

  // Fetch registrations from the backend
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/registrations');
        if (response.ok) {
          const data = await response.json();
          setRegistrations(data.registrations);
        } else {
          throw new Error('Failed to fetch registrations');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching registrations');
      }
    };

    fetchRegistrations();
  }, []);

  // Mark registration as complete
  const handleComplete = async (id) => {
    try {
      const response = await fetch('/api/registrations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed: true }),
      });

      if (response.ok) {
        toast.success('Registration marked as complete');
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id ? { ...reg, completed: true } : reg
          )
        );
      } else {
        throw new Error('Failed to update registration');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error marking registration as complete');
    }
  };

  return (
    <div className='mt-64'>
      <ToastContainer /> {/* Place ToastContainer here */}
      <h1 className='font-bold text-2xl p-4'>Registrations</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
        {registrations.map((registration) => (
          <div
            key={registration._id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              width: '210px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3>{registration.name}</h3>
              <p>Email: {registration.email}</p>
              <p>Phone: {registration.phone}</p>
              <p>College: {registration.college}</p>
              <p>Event: {registration.event}</p>
            </div>
            <p>
              Uploaded Receipt:
              <br />
              {registration.file?.data && (
                <Image
                  src={`data:image/png;base64,${registration.file.data}`}
                  alt="Uploaded Receipt"
                  width={200}
                  height={200}
                />
              )}
            </p>
            <button
              style={{
                backgroundColor: registration.completed ? 'green' : 'gray',
                color: 'white',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                cursor: registration.completed ? 'not-allowed' : 'pointer',
              }}
              disabled={registration.completed}
              onClick={() => handleComplete(registration._id)}
            >
              {registration.completed ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default Registrations;
