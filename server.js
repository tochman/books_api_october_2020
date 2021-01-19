const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const BooksController = {
  index(request, response, next) {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      } else {
        response.status(200).json({ books: results.rows })
      }
    })
  },
  create(request, response, next) {
    const { author, title } = request.body
    pool.query(
      'INSERT INTO books (author, title) VALUES ($1, $2)',
      [author, title],
      error => {
        if (error) { throw error }
        response.status(201).json({ message: 'Book was added to the db...' })
      })
  }
}


app
  .route('/books')
  .get(BooksController.index)
  .post(BooksController.create)

app.listen(3001, () => { console.log('Server is up and running....') })