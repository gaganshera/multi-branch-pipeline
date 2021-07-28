let request = require(`supertest`);
let app = require('../app');
describe(`GET /`, function () {
  it(`respond with hello world`, function (done) {
    request(app).get(`/users`).expect(`respond with a resource`, done);
  });
});

describe(`Other cases`, function () {
  it(`Return 200`, function (done) {
    request(app).get(`/`).expect(200, done);
  });

  it(`Should return 404`, function (done) {
    request(app).get(`/sakldjhgcvf`).expect(404, done);
  });
});