// booking-app/server/server.ts
import express, { Request, Response } from 'express';
import * as path from 'path';

const app = express();
const __dirname: string = path.resolve();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.post('/api/bookings', (req: Request, res: Response) => {
  // Handle the booking request here
  // For example, you can extract the booking data from the request body
  const { bookingData } = req.body;

  // Process the booking data and return a response
  res.json({ message: 'Booking created successfully' });
});

app.use(express.static(path.join(__dirname, 'public')));
