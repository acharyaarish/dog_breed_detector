import React from 'react';

const Notification = ({ message, isError }) => {
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg animate-bounce ${isError ? 'bg-red-600' : 'bg-green-600'} text-white`}>
      {message}
    </div>
  );
};

export default Notification;
