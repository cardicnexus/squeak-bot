import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('✅ SKWS247 Bot is alive!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Keepalive listening on ${port}`));
