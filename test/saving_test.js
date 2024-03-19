const assert = require('assert');
const User = require('../models/users');
const Project = require('../models/projects');
//describe tests
describe('Saving records', function() {

    // create tests
    it('Saves a admin user to a database', function(done) {
        
        var admin_user = new User({
            username: 'admin',
            password: 'admin123',
            privilege: 'administrator'
        });

        admin_user.save().then(function() {
            assert(admin_user.isNew === false);
            done();
        });

        
    });

    it('Saves a normal user to a database', function(done) {
        
        var user = new User({
            username: 'user',
            password: 'user123',
            privilege: 'normal'
        });

        user.save().then(function() {
            assert(user.isNew === false);
            done();
        });

        
    });
    

    it('Saves a project to database', function(done) {
        var project = new Project({
            naslov: 'title text',
            opis: 'description',
            poslovni_ucinek: 'effect',
            rok_implementacije: 'deadline',
            status: 'active'
        });

        project.save().then(function() {
            assert(project.isNew === false);
            done();
        })
    });

});