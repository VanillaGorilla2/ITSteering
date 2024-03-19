import React from 'react';
import './styles/ITSteering.css'
const ITSteering = ({ username }) => {
  return (
    <>
        <div className='header'>
            Prijavljeni ste kot {username}
            <button className='odjava'>Odjava</button>
        </div>
      {/* Add your IT Steering page content here */}
    </>
  );
};

export default ITSteering;
