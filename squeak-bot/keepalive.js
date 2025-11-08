import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('✅ SKWS247 Bot is alive!'));
app.listen(process.env.PORT || 3000);
