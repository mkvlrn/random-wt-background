import cors from 'cors';
import express, { Request, Response } from 'express';
import { pino } from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();
app.use(cors());

app.get('/', async (request: Request, response: Response) => {
  const { gist } = request.query;

  try {
    const defaultGist = '6f8e142615c905989dce6e7f715932d0';
    const raw = await fetch(`https://api.github.com/gists/${gist || defaultGist}`);
    const rawJson = await raw.json();
    const gifs = JSON.parse(rawJson.files['terminal-backgrounds.json'].content);
    const gifsArray = Object.values(gifs) as string[];

    logger.info(`user: ${rawJson.owner.login} - gist: ${rawJson.html_url}`);

    const randomIndex = Math.floor(Math.random() * gifsArray.length);
    response.redirect(gifsArray[randomIndex]);
  } catch (error) {
    logger.error(error);
    response.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
