const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors()); //TODO : Later use cors with specific origin for security reasons, currently allowing all origins for testing purposes

app.get('/', (req, res) => {
    console.log("Test Endpoing Hit")
    res.json({
        message: "Test Endpoing Working"
    });
});

app.use('/api/users', userRoutes);

async function connectDB() {
    try {
        await mongoose.connect(databaseUrl)
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error Connecting to MongoDB: ", error);
    }
}

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server is Listening on PORT: ", port);
    });
});

