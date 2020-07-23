var request = require(`supertest`);
const express = require('express');
var app = require('../app');
// var app = express();
describe(`GET /`, function () {
    it(`respond with hello world`, function(done) {
        //navigate to root and check the the response is "hello world"
        // console.log(request(app).get(`/users`))
        request(app).get(`/users`).expect(`respond with a resource`, done);
 });
});
