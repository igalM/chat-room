
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    databaseURL: process.env.DB_URI,
    databaseUser: process.env.DB_USER,
    databasePass: process.env.DB_PASS,
};