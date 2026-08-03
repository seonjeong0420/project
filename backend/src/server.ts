import 'dotenv/config';
import app from './app';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

app.listen(4000, () => {
  console.log('Server running 4000');
});
