import React, { useEffect, useState } from 'react';
import './styles/ITSteering.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const ITSteering = ({ username }) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {

    axios.get('http://localhost:3001/getProjects')
    .then(projects => setProjects(projects.data))
    .catch(err => console.log(err));
  }, [])

  const handleRedirectToLogin = () => {
    window.location.href = '/login'; // Redirect to the login page
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'V izvedbi':
        return 'orange';
      case 'Zaključeno':
        return 'green';
      case 'V presoji':
        return 'yellow';
      case 'Na čakanju':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className='content'>
        <div className='header'>
            Prijavljeni ste kot {username}
            <button className='odjava_btn' onClick={handleRedirectToLogin}>Odjava</button>
        </div>

      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">

        <div className="w-50">

        <table className='table'>
          <thead>
            <tr>
              <th>
                Naslov
              </th>
              <th scope='col'>
                Opis
              </th>
              <th scope='col'>
                Poslovni učinek
              </th>
              <th scope='col'>
                Rok implementacije
              </th>
              <th scope='col'>
                Status
              </th>
              <th scope='col'>

              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => {
              return <tr>
                <td>{project.naslov}</td>
                <td>{project.opis}</td>
                <td>{project.poslovni_ucinek}</td>
                <td>{project.rok_implementacije}</td>
                <td style={{color: getStatusColor(project.status)}}>{project.status}</td>
                <td>
                  <button className='delete_btn'>Izbriši</button>
                  <button className='edit_btn'>Uredi</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
        
    </div>
  );
};

export default ITSteering;
