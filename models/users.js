const mongooose = require('mongoose');
const Schema = mongooose.Schema;

//create schema and model

const UsersSchema = new Schema({
    username: String,
    password: String,
    privilege: String
});


const Users = mongooose.model('users', UsersSchema);

module.exports = Users;