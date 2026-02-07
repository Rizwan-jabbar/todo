import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected successfully');

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
