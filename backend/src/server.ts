import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    // Debugging step to log the database URI
    console.log('Connecting to MongoDB with URI');

    await mongoose.connect(config.database_uri as string);

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

// Handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', () => {
  console.log('UnhandledRejection detected, shutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('UncaughtException detected, shutting down...');
  process.exit(1);
});
