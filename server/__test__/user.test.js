process.env.NODE_ENV = 'test';
process.env.MONGO_URL = "mongodb+srv://vivektangudu:viv@cluster0.czt49fi.mongodb.net/testdb"
process.env.PORT = 5004
const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const User = require("../models/usersModel.js")


chai.use(chaiHttp);
const expect = chai.expect;
const name = "vivek"
const email = "vivek@gmail.com";
const password = "123"
const phone = "12345"
describe('Register API Tests', () => {


    it('Create user - success', async () => {
        try {
            const res = await chai.request(app)
                .post('/api/users/Register')
                .send({ name, email, password, phone });

            expect(res.body.success).to.be.false;

        } catch (error) {
            // console.error('Error during test:', error);
            throw error;
        }
    });
    it('Create user - Failure Same email', async () => {
        const name = "viv"
        try {
            const res = await chai.request(app)
                .post('/api/users/Register')
                .send({ name, email, password, phone });


            expect(res.body.success).to.be.false;

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });
    it('Create user - Failure Same email', async () => {
        const email = "viv@gmail.com"
        try {
            const res = await chai.request(app)
                .post('/api/users/Register')
                .send({ name, email, password, phone });

            expect(res.body.success).to.be.false;

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });

});

describe('User API Tests', () => {
    it('Signin user - Failure', async () => {
        const email = "rahul@gmail.com";
        const password = "rahul";

        try {
            const user = await User.findOne({ email, password });

            const res = await chai.request(app)
                .post('/api/users/login')
                .send({ email, password });
            expect(res.body.success).to.be.true;

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });

    it('Signin user - Failure No user with username', async () => {
        const email = "rahull@gmail.com";
        const password = "rahul";

        try {
            const user = await User.findOne({ email, password });

            const res = await chai.request(app)
                .post('/api/users/login')
                .send({ email, password });
            expect(res.body.success).to.be.false;

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });

    it('Signin user - Success', async () => {
        const email = 'vivek@gmail.com';
        const password = '123';

        try {
            // Execute the query using await
            const user = await User.findOne({ email, password });
            const res = await chai.request(app)
                .post('/api/users/login')
                .send({ email, password });

            expect(res.body.success).to.be.true;

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });

});