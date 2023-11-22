import { create, defaults, router } from 'json-server';

const server = create();
const jsonRouter = router('server/db.json');
const middlewares = defaults();

server.use(middlewares);
server.use(jsonRouter);
server.listen(5000, () => {
    console.log('JSON Server is running');
});
const express = require('express');
const app = express();

// تنظیمات CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// سایر تنظیمات و راه‌اندازی سرور
// ...

// راه‌اندازی سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});