import React from 'react';

const Schedule = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
        <p className="text-lg text-gray-600">
          The event schedule is being finalized and will be posted here shortly.
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Please check back later for updates.
        </p>
      </div>
    </div>
  );
};

export default Schedule;
