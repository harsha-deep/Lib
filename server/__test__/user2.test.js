process.env.NODE_ENV = 'test';
process.env.MONGO_URL = 'mongodb://localhost:27017/testdb'
process.env.PORT = 5010
const mongoose = require("mongoose");
const UserModel = require("../models/usersModel"); // Update the path accordingly

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;


beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.start(); // Use start() to explicitly start the server
    await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear the database before each test
    await mongoose.connection.dropDatabase();
});

test('Create and retrieve user', async () => {
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        password: 'securepassword',
        role: 'patron',
    };

    const createdUser = await UserModel.create(userData);

    const retrievedUser = await UserModel.findById(createdUser._id);

    expect(retrievedUser.name).toBe(userData.name);
    expect(retrievedUser.email).toBe(userData.email);
    expect(retrievedUser.phone).toBe(userData.phone);
    expect(retrievedUser.password).toBe(userData.password);
    expect(retrievedUser.role).toBe(userData.role);
});
// test('Duplicate user', async () => {
//     const userData = {
//         name: 'Bob Doe',
//         email: 'john.doe@example.com', // Same email as the first user
//         phone: '9876543210',
//         password: 'yetanotherpassword',
//         role: 'patron',
//     };

//     try {
//         await UserModel.create(userData);
//         fail('Creating a user with a duplicate email should throw an error');
//     } catch (error) {
//         console.log(error)
//         expect(error.code).toBe();
//     }
// });

