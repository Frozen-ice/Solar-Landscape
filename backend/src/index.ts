import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config';
import database from './models/database';
import { errorHandler } from './middleware/errorHandler';
import enrollmentRoutes from './routes/enrollmentRoutes';

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin
}));
app.use(bodyParser.json());

// Routes
app.use('/api', enrollmentRoutes);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await database.connect();
    
    // Start listening
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await database.close();
  process.exit(0);
});

// Start the server
startServer(); 