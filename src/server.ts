import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({
    message: 'Hello Next Level Week Five (GET)',
  });
});

app.post('/', (request, response) => {
  return response.json({
    message: 'Hello Next Level Week Five (POST)',
  });
});

app.listen(3333, () => console.log('🚀️ Server is running on port 3333 🚀️'));