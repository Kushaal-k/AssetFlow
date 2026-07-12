import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'AssetFlow API is running!' });
});

import allocationRouter from './routes/allocation.routes.js';
import transferRouter from './routes/transfer.routes.js';
import bookingRouter from './routes/booking.routes.js';
import maintenanceRouter from './routes/maintenance.routes.js';

app.use('/api/allocations', allocationRouter);
app.use('/api/transfers', transferRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/maintenance', maintenanceRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
