import app from './app';
import { connectDB } from './config/db';
import { PORT } from './config/env';

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
