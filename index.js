const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users')
const Project = require('./models/projects')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0/myDatabase');

app.get('/getUsers', (req, res) => {
    User.find().then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getProjects', (req, res) => {
    Project.find().then(projects => res.json(projects))
    .catch(err => res.json(err))
})

app.delete('/projects/:id', async (req,res) => {
    const projectID = req.params.id;
    try {
        await Project.findByIdAndDelete(projectID);
        res.status(200).json({message: 'Project deleted succesfully'});
    } catch (error) {
        console.error('Error deleting the project: ', error);
        res.status(500).json({error: 'An error occurred while deleting the project'});
    }
})

app.put('/projects/:id', async (req, res) => {
    const projectId = req.params.id;
    const updatedProjectData = req.body; // Assuming you're sending the updated project data in the request body
    try {
      // Update the project in the database
      await Project.findByIdAndUpdate(projectId, updatedProjectData);
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'An error occurred while updating the project' });
    }
});

app.post('/saveProject', async (req, res) => {
    const newProjectData = req.body;

    try {
        const newProject = await Project.create(newProjectData);
        res.status(201).json({ message: 'Project saved successfully', project: newProject });
    }catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ error: 'An error occurred while saving the project' });
    }
})
app.listen(3001, () => {
    console.log("server is running")
})