import { app } from './app.js';
import { connectDB } from './config/database.config.js';

connectDB();

const PORT = process.env.PORT;


app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}/ in ${process.env.NODE_ENV} mode!`);
});