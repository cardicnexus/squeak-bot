// SKWS247 Bot – Telegraf (Codespaces/Render ready)
// npm i telegraf node-fetch dotenv
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN missing in .env');
}

// === SKWS247 links ===
const MINT = 'GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo';
const PUMP = 'https://pump.fun/coin/GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo';
const DEX  = `https://dexscreener.com/solana/${MINT}`;
const JUP  = `https://jup.ag/swap/SOL-SKWS247?outputMint=${MINT}`;
const BIRD = `https://birdeye.so/token/${MINT}?chain=solana`;

// Community links (provided by user)
const TG_COMMUNITY = 'https://t.me/officialpump4life'; // Telegram only for now

const bot = new Telegraf(BOT_TOKEN);

// --- tiny anti-spam throttle ---
const hits = new Map();
bot.use((ctx, next) => {
  const id = ctx.from?.id;
  if (!id) return next();
  const now = Date.now(), last = hits.get(id) || 0;
  if (now - last < 1200) return; // ignore if <1.2s between commands
  hits.set(id, now);
  return next();
});

// Dexscreener stats (works after on-chain LP / Raydium pair exists)
async function getStats() {
  try {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${MINT}`;
    const r = await fetch(url);
    const j = await r.json();
    const p = j?.pairs?.[0];
    if (!p) return null;
    return {
      price: p.priceUsd ? Number(p.priceUsd) : null,
      liq: p.liquidity?.usd || null,
      vol24: p.volume?.h24 || null,
      mcap: p.fdv || p.marketCap || null,
      url: p.url || DEX
    };
  } catch (e) {
    return null;
  }
}

// ===== Commands =====
bot.start(async (ctx) => {
  await ctx.replyWithHTML(
`🐭 <b>Welcome to SKWS247</b> — the funniest meme coin on Solana! 🧀
Commands: /contract /chart /buy /community /fun /stats`,
    Markup.inlineKeyboard([
      [Markup.button.url('🛒 Buy (Pump.fun)', PUMP)],
      [Markup.button.url('📊 Chart (Dexscreener)', DEX), Markup.button.url('Birdeye', BIRD)],
      [Markup.button.url('💱 Swap on Jupiter', JUP)],
      [Markup.button.url('🐭 Community (Telegram)', TG_COMMUNITY)]
    ])
  );
});

bot.command('contract', (ctx) =>
  ctx.replyWithHTML(`🔐 <b>Token Mint</b>\n<code>${MINT}</code>\n\n📊 Chart: ${DEX}\n🛒 Buy: ${PUMP}`)
);

bot.command('chart', (ctx) =>
  ctx.reply('📊 Open chart:', Markup.inlineKeyboard([
    [Markup.button.url('Dexscreener', DEX)],
    [Markup.button.url('Birdeye', BIRD)]
  ]))
);

bot.command('buy', (ctx) =>
  ctx.reply('🧀 Choose where to buy:', Markup.inlineKeyboard([
    [Markup.button.url('Pump.fun', PUMP)],
    [Markup.button.url('Jupiter', JUP)]
  ]))
);

bot.command('community', (ctx) =>
  ctx.reply('Join the Mouse Pack:', Markup.inlineKeyboard([
    [Markup.button.url('Telegram', TG_COMMUNITY)]
  ]))
);

const funLines = [
  '🐭 Squeak squeak! Diamond paws only.',
  '🧀 More cheese, less FUD.',
  '🚀 The mouse pack never sleeps.'
];
bot.command('fun', (ctx) => ctx.reply(funLines[Math.floor(Math.random()*funLines.length)]));

bot.command('stats', async (ctx) => {
  const s = await getStats();
  if (!s) return ctx.replyWithHTML(
    'ℹ️ Not on Dexscreener yet (still off-chain on Pump.fun).\n' + PUMP
  );
  const msg =
`📈 <b>$SKWS247 Stats</b>
• Price: $${s.price?.toFixed(6)}
• 24h Vol: $${Math.round(s.vol24 || 0).toLocaleString()}
• Liquidity: $${Math.round(s.liq || 0).toLocaleString()}
• Mcap (est): $${Math.round(s.mcap || 0).toLocaleString()}
🔗 ${s.url}`;
  await ctx.replyWithHTML(msg);
});

bot.launch().then(() => console.log('✅ SKWS247 bot running'));
process.on('SIGINT', () => bot.stop('SIGINT'));
process.on('SIGTERM', () => bot.stop('SIGTERM'));
