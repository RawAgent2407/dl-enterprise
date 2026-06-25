import 'dotenv/config';
import app from './app';

const PORT = Number(process.env.PORT) || 1337;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
