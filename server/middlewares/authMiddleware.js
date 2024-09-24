const jWT =  require('jsonwebtoken');
require('dotenv').config;
const JWT_SECRET = process.env.JWT_SECRET;
const {User} = require('../config/db');