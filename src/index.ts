import cors from 'cors';
import express, { Request, Response } from 'express';
import bgs from './bgs.json' assert { type: 'json' };

const app = express();
app.use(cors());

app.get('/', async (request: Request, response: Response) => {
  try {
    const bgsArray = Object.values(bgs) as string[];

    const randomIndex = Math.floor(Math.random() * bgsArray.length);
    response.redirect(bgsArray[randomIndex]);
  } catch {
    response.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
