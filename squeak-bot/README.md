# SQUEAK Bot (Telegraf)

A simple Telegram bot for the SQUEAK meme coin on Solana.

## Features
- `/start` – welcome + buttons
- `/contract` – show token mint
- `/chart` – Dexscreener/Birdeye links
- `/buy` – Pump.fun and Jupiter
- `/community` – Telegram community link
- `/fun` – random hype lines
- `/stats` – price/liquidity (works after on-chain LP)

## Quick Start (GitHub Codespaces)

1. Create/open your Codespace for this repo.
2. In the terminal, run:
   ```bash
   npm install
   cp .env.example .env
   # Edit .env and paste your BotFather token
   nano .env   # or use the editor
   npm start
   ```
3. DM your bot on Telegram and try `/start`.

## Environment
Create `.env` with:
```
BOT_TOKEN=your_telegram_bot_token
```

## Links wired
- Mint: `GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo`
- Pump.fun: https://pump.fun/coin/GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo
- Dexscreener: https://dexscreener.com/solana/GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo
- Jupiter: https://jup.ag/swap/SOL-SQUEAK?outputMint=GnBeEAfVkFZMnmjNDJawzyU34Z9FfymZdfLEw3eL1tqo
- Community: https://t.me/officialpump4life
