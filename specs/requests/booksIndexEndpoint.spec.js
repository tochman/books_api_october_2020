const app = require('../../server')
const supertest = require('supertest')
const { expect, jsonResponse} = require('../specHelper')

let server, request, response

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
});

after(done => {
  server.close(done)
});

describe('GET /books', () => {
  beforeEach(async () => {
    response = await request.get('/books')
  });

  it('is expected to respond with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('is expected to return a collection of books', () => {
    const expectedBody = '{"books":[{"id":2,"author":"A. Lindgren","title":"The Adventures of Pippi Longstocking"},{"id":1,"author":"J.K. Rowling","title":"Harry Potter"},{"id":3,"author":"T. Ochman","title":"Getting Started with NodeJS"},{"id":7,"author":"John Irving","title":"In One Person"},{"id":8,"author":"T. Ochman","title":"Fun With PostgreSQL"},{"id":10,"author":"T. Ochman","title":"Fun With PostgreSQL Part II"},{"id":11,"author":"E. Thalén","title":"No Fun With PostgreSQL Part III"}]}'
    expect(jsonResponse(response)).to.equal(expectedBody)
  });
});