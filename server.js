import { app } from './app.js';
import { connectDB } from './config/database.config.js';

connectDB();

const PORT = process.env.PORT;


app.listen(PORT, (req, res) => {
    console.log(`Server listening on https://todo-backend-kmx3.onrender.com/ in ${process.env.NODE_ENV} mode!`);
});
