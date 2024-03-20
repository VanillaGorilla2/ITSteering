import React, { useEffect, useState } from 'react';
import './styles/ITSteering.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const ITSteering = ({ username }) => {
  const [projects, setProjects] = useState([])
  const [editableRows, setEditableRows] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/getProjects')
    .then(projects => setProjects(projects.data))
    .catch(err => console.log(err));
  }, [])

  const handleRedirectToLogin = () => {
    window.location.href = '/login'; // Redirect to the login page
  };

  const deleteProject = async (projectId) => {
    try {
      // Make a DELETE request to the backend API endpoint
      const response = await axios.delete(`http://localhost:3001/projects/${projectId}`);
      return response.data; // Optionally handle the response
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };


  const handleDeleteProject = async (projectId, index) => {
    try {
      await deleteProject(projectId); // Call deleteProject function
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error, if any
    }
  };

  const handleEditProject = (index) => {
    const updatedEditableRows = [...editableRows];
    updatedEditableRows[index] = true;
    setEditableRows(updatedEditableRows);
  };

  const handleSaveProject = async (projectId, updatedProjectData, index) => {
    try {
      await axios.put(`http://localhost:3001/projects/${projectId}`, updatedProjectData);
      const updatedEditableRows = [...editableRows];
      updatedEditableRows[index] = false;
      setEditableRows(updatedEditableRows);
    } catch (error) {
      console.error('Error updating project:', error);
      // Handle error, if any
    }
  };

  const handleInputChange = (e, index, fieldName) => {
    const { value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][fieldName] = value;
    setProjects(updatedProjects);
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

      <div className="w-100 vh-100 d-flex justify-content-center align-items-center" id='container'>
        <h1>IT Steering</h1>
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
          {projects.map((project, index) => (
            <tr key={index}>
                  <td>{editableRows[index] ? <input type="text" value={project.naslov} onChange={(e) => handleInputChange(e, index, 'naslov')} /> : project.naslov}</td>
                  <td>{editableRows[index] ? <input type="text" value={project.opis} onChange={(e) => handleInputChange(e, index, 'opis')} /> : project.opis}</td>
                  <td>{editableRows[index] ? <input type="text" value={project.poslovni_ucinek} onChange={(e) => handleInputChange(e, index, 'poslovni_ucinek')} /> : project.poslovni_ucinek}</td>
                  <td>{editableRows[index] ? <input type="text" value={project.rok_implementacije} onChange={(e) => handleInputChange(e, index, 'rok_implementacije')} /> : project.rok_implementacije}</td>
                  <td style={{ color: getStatusColor(project.status) }}>
                    {editableRows[index] ?
                      <select value={project.status} onChange={(e) => handleInputChange(e, index, 'status')}>
                        <option value="V izvedbi" style={{color: 'black'}}>V izvedbi</option>
                        <option value="Zaključeno" style={{color: 'black'}}>Zaključeno</option>
                        <option value="V presoji" style={{color: 'black'}}>V presoji</option>
                        <option value="Na čakanju" style={{color: 'black'}}>Na čakanju</option>
                      </select>
                      : project.status}
                  </td>
                  <td>
                  <button className='delete_btn' onClick={() => handleDeleteProject(project._id, index)}>Izbriši</button>

                    {!editableRows[index] && <button className='edit_btn' onClick={() => handleEditProject(index)}>Uredi</button>}
                    {editableRows[index] && <button className='save_btn' onClick={() => handleSaveProject(project._id, { naslov: project.naslov, opis: project.opis, poslovni_ucinek: project.poslovni_ucinek, rok_implementacije: project.rok_implementacije, status: project.status }, index)}>Shrani</button>}                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
        
    </div>
  );
};

export default ITSteering;
