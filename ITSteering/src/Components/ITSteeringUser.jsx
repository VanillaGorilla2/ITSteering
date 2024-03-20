import React, { useEffect, useState } from 'react';
import './styles/ITSteeringUser.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const ITSteering = ({ username }) => {
  const [projects, setProjects]                 = useState([])
  const [isPrijavaClicked, setIsPrijavaClicked] = useState(false);
  const [newProject, setNewProject]             = useState({
    naslov            : '',
    opis              : '',
    poslovni_ucinek   : '',
    rok_implementacije: '',
    status: 'V presoji'
  });

  useEffect(() => {

    axios.get('http://localhost:3001/getProjects')
    .then(projects => setProjects(projects.data))
    .catch(err => console.log(err));
  }, [])

  const handlePrijavaClick = () => {
    setIsPrijavaClicked(true);
  };

  const handleRedirectToLogin = () => {
    window.location.href = '/login';  // Redirect to the login page
  };

  const handleSubmit = () => {
    if(newProject.naslov === '' || newProject.opis === '' || newProject.poslovni_ucinek === '' || newProject.rok_implementacije === '') {
        alert('Please fill all fields');
    } else {
        axios.post('http://localhost:3001/saveProject', newProject)
        .then(response => {
          console.log(response.data);
          setProjects(prevProjects => [...prevProjects, response.data.project]);
        })
        .catch(err => {
          console.error(err);
        });
        setIsPrijavaClicked(false);
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className = 'content'>
    <div className = 'header'>
            Prijavljeni ste kot {username}
            <button className = 'odjava_btn' onClick = {handleRedirectToLogin}>Odjava</button>
        </div>

        <div className = 'prijava'>
        {!isPrijavaClicked ? (
            <>
                
                <div    className = "w-100 vh-100 d-flex justify-content-center align-items-center" id='container'>
                <button className = 'prijava_btn' onClick = {handlePrijavaClick}>Prijava projekta</button>
                <h1>IT Steering</h1>

                <div className = "w-50">

                <table className = 'table'>
                <thead>
                    <tr>
                    <th>
                        Naslov
                    </th>
                    <th scope = 'col'>
                        Opis
                    </th>
                    <th scope = 'col'>
                        Poslovni učinek
                    </th>
                    <th scope = 'col'>
                        Rok implementacije
                    </th>
                    <th scope = 'col'>
                        Status
                    </th>
                    <th scope = 'col'>

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
                        <td style = {{color: getStatusColor(project.status)}}>{project.status}</td>
                    </tr>
                    })}
                </tbody>
                </table>
                </div>
                </div>
            </>

        ) : (
          <div> {/* Render your another page content here */}
            <>
                <div className='newProject_container'>
                    <h1>Prijava projekta na IT Steering</h1>
                    <div className='input_fields'>
                        <input type='text' className='input_tag' placeholder='Naslov projekta' name='naslov' value={newProject.naslov} onChange={handleInputChange}></input>
                        <input type='text' placeholder='Opis projekta' className='opis_input' name='opis' value={newProject.opis} onChange={handleInputChange}></input>
                        <input type='text' className='input_tag' placeholder='Poslovni učinek' name='poslovni_ucinek' value={newProject.poslovni_ucinek} onChange={handleInputChange}></input>
                        <label>Rok implementacije</label>
                        <input type='date' className='date_input' name='rok_implementacije' value={newProject.rok_implementacije} onChange={handleInputChange}></input>
                    </div>

                    <button className='oddaj_btn' onClick={handleSubmit}>Oddaj prijavo</button>
                </div>
            </>
            {/* Add content for the another page */}
          </div>
        )}
      </div>

      
        
    </div>
  );
};

export default ITSteering;
