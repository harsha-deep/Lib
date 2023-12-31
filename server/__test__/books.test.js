process.env.NODE_ENV = 'test';
process.env.MONGO_URL = "mongodb://localhost:27017/testdb"
process.env.PORT = 5003
const jwt = require("jsonwebtoken");
const chai = require('chai');
const mongoose = require("mongoose");
const chaiHttp = require('chai-http');
const app = require('../server.js'); // Adjust the path based on your project structure
const Book = require("../models/booksModel");
const bodyParser = require("body-parser")

chai.use(chaiHttp);
const expect = chai.expect;

const authMiddleware = require('../middlewares/authMiddleware.js');
const testToken = jwt.sign({ userId: 'yourUserId' }, process.env.jwt_secret);


const request = {
    title: "Test Book",
    description: "This is a test book description.",
    category: "Test Category",
    image: "test_image_url.jpg",
    author: "Test Author",
    publisher: "Test Publisher",
    publishedDate: "2023-12-30",
    rentPerDay: 10,
    totalCopies: 5,
    createdBy: "5f8b7d1f4f16db2e88c3b4a6",
    headers: {
        authorization: `Bearer ${testToken}`,
    }
};


let createdBookId;
describe('Book API Tests', () => {
    let createdBookId;

    it('Add a book', async () => {
        const res = await chai.request(app)
            .post('/api/books/add-book')
            .set('Authorization', `Bearer ${testToken}`)
            .send(request);

        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Book added successfully');
        createdBookId = res.body.mongores._id;
    });

    it('Get a book by ID', async () => {
        const res = await chai.request(app)
            .get(`/api/books/get-book-by-id/${createdBookId}`)
            .set('Authorization', `Bearer ${testToken}`);

        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.have.property('_id', createdBookId);
    });
    it('Update a book', async () => {
        const updatedBookData = {
            title: "Updated Book Title",
        };

        const res = await chai.request(app)
            .put(`/api/books/update-book/${createdBookId}`)
            .set('Authorization', `Bearer ${testToken}`)
            .send(updatedBookData);

        console.log(res)
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Book updated successfully');
    });

    it('Get all books', async () => {
        const res = await chai.request(app)
            .get('/api/books/get-all-books')
            .set('Authorization', `Bearer ${testToken}`);


        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.an('array');
    });
    it('Delete a book', async () => {
        const res = await chai.request(app)
            .delete(`/api/books/delete-book/${createdBookId}`)
            .set('Authorization', `Bearer ${testToken}`);

        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Book deleted successfully');
    });
});






