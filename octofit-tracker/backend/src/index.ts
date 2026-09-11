import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl: baseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Octofit backend listening at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the backend:', error);
    process.exitCode = 1;
  });