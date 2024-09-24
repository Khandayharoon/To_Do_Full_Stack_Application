const express = require('express');
const { connectDB } = require('./config/db');
const signUpRoute = require('./routes/signUpRoute');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/v1/signup', signUpRoute); 

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/api/v1`);
});
