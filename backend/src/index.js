import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import serverConfig from './config/serverConfig.js';
import dbConnect from './config/dbConfig.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser'

// Initialize the Express app
const app = express();

// Set up cors origin
//http://localhost:5173

const corsOptions = {
  origin : ['https://mensfashionapp.onrender.com'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


// Routes
app.use('/', routes);

// Database connection and server start
const startServer = async () => {
  try {

    await dbConnect();
    console.log('DB connected successfully');
    app.listen(serverConfig.port, () => {
      console.log(`Server listening on Port ${serverConfig.port}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1); 
  }
};

startServer();

export default app;
