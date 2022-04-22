const mongoose = require('mongoose');
const User = require('../models/user');

const users = require('./_seedData/users.json');

const seedData = async () => {
    const uri = 'mongodb://127.0.0.1:27017/test_db';
    try {
        await mongoose.connect(uri, {useNewUrlParser: true})
        console.log('Connected to database');
        await User.deleteMany();
        await User.create(users);
        console.log('Data has been seeded successfully');
        await mongoose.connection.close();
    } catch (error) {
        console.log(`Error seeding data: ${error.stack}`)
    }
    process.exit();
}

const deleteData = async () => {
    const uri = 'mongodb://127.0.0.1:27017/test_db';
    try {
        await mongoose.connect(uri, {useNewUrlParser: true})
        console.log('Connected to database');
        await User.deleteMany();
        console.log('Collection has been cleared');
        await mongoose.connection.close();
    } catch (error) {
        console.log(`Error clearing collection: ${error.stack}`)
    }
    process.exit();
}

if (process.argv[2] === '-i') {
    seedData().then()
}

if (process.argv[2] === '-d') {
    deleteData().then()
}