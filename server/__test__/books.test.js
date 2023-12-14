const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js'); // Adjust the path based on your project structure
const Book = require("../models/booksModel");

chai.use(chaiHttp);
const expect = chai.expect;
const token_val = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0NDhkNjkyNzJlMzc2Yjc3ZmM3ZjYiLCJpYXQiOjE3MDI0NjY3MjMsImV4cCI6MTcwMjU1MzEyM30.kIEqeDKy8asrL-hJV_0ElDpTZXUpUN2f-XFQz2Oayvs"
const request = {
    body: {
        title: "Test Book",
        description: "This is a test book description.",
        category: "Test Category",
        image: "test_image_url.jpg",
        author: "Test Author",
        publisher: "Test Publisher",
        publishedDate: new Date("2023-01-01"),
        rentPerDay: 10,
        totalCopies: 5,
        availableCopies: 3,
        createdBy: "5f8b7d1f4f16db2e88c3b4a6",
    },
    headers: {
        authorization: `Bearer ${token_val}`,
    }
};


describe('Book API Tests', () => {
    let createdBookId;

    // Test for adding a book
    it('Add a book', async () => {
        const res = await chai.request(app)
            .post('/api/books/add-book')
            .send(request);

        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Book added successfully');

        // Assuming the response includes the ID of the created book
        createdBookId = res.body.data._id;
    });

    // Test for updating a book
    // it('Update a book', async () => {
    //     const updatedBookData = {
    //         title: "Updated Book Title",
    //         // Add other updated properties as needed
    //     };

    //     const res = await chai.request(app)
    //         .put(`/api/books/update-book/${createdBookId}`)
    //         .send(updatedBookData);

    //     expect(res).to.have.status(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.message).to.equal('Book updated successfully');
    // });

    // // Test for deleting a book
    // it('Delete a book', async () => {
    //     const res = await chai.request(app)
    //         .delete(`/api/books/delete-book/${createdBookId}`);

    //     expect(res).to.have.status(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.message).to.equal('Book deleted successfully');
    // });

    // Test for getting all books
    // it('Get all books', async () => {
    //     const res = await chai.request(app)
    //         .get('/api/books/get-all-books');

    //     expect(res).to.have.status(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.data).to.be.an('array');
    // });

    // // Test for getting a book by ID
    // it('Get a book by ID', async () => {
    //     const res = await chai.request(app)
    //         .get(`/api/books/get-book-by-id/${createdBookId}`);

    //     expect(res).to.have.status(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.data).to.have.property('_id', createdBookId);
    // });
});
