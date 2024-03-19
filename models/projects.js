const mongooose = require('mongoose');
const Schema = mongooose.Schema;

//create schema and model

const ProjectsSchema = new Schema({
    naslov: String,
    opis: String,
    poslovni_ucinek: String,
    rok_implementacije: String,
    status: String
});


const Projects = mongooose.model('user', ProjectsSchema);

module.exports = Projects;