# Setup Guide - Multi-Language Discord Music Bot

## Quick Start

### 1. Prerequisites
- Node.js 18.0.0 or higher
- Discord Developer Account
- Discord Bot Tokens (one for each bot)

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd discord-music-bot

# Install dependencies
npm install

# Run setup script
chmod +x deploy.sh
./deploy.sh
```

### 3. Configuration

#### Step 1: Create Discord Bots
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create two applications (one for Arabic, one for English)
3. Go to "Bot" section for each application
4. Copy the bot tokens

#### Step 2: Configure Environment
Edit `.env` file:
```bash
# Bot 1 (Arabic)
BOT1_TOKEN=your_arabic_bot_token_here
BOT1_CLIENT_ID=your_arabic_bot_client_id_here
BOT1_CHANNEL_ID=your_arabic_channel_id_here
BOT1_PREFIX=!

# Bot 2 (English)
BOT2_TOKEN=your_english_bot_token_here
BOT2_CLIENT_ID=your_english_bot_client_id_here
BOT2_CHANNEL_ID=your_english_channel_id_here
BOT2_PREFIX=!

# Spotify API (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

#### Step 3: Bot Permissions
Each bot needs these permissions:
- Send Messages
- Embed Links
- Connect
- Speak
- Use Voice Activity
- Read Message History

#### Step 4: Invite Bots
Use these URLs (replace CLIENT_ID):
```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=314880&scope=bot
```

### 4. Start the Bots
```bash
# Development mode
npm run dev

# Production mode
npm start

# With PM2
npm install -g pm2
pm2 start ecosystem.config.js
```

## Features

### Multi-Bot System
- **Arabic Bot**: Responds only in Arabic channel
- **English Bot**: Responds only in English channel
- **Independent Operation**: Each bot runs separately

### Language Support
- **Arabic**: Full Arabic command support
- **English**: Full English command support
- **Localized Messages**: All responses in appropriate language

### Music Platforms
- **YouTube**: Full video and playlist support
- **Spotify**: Track, album, and playlist support
- **SoundCloud**: Track and playlist support

### Advanced Features
- **Queue Management**: Add, remove, shuffle, clear
- **Volume Control**: 0-100% volume adjustment
- **Loop Modes**: Off, Song, Queue
- **Autoplay**: Automatic song suggestions
- **Performance Monitoring**: Memory and CPU tracking

## Troubleshooting

### Common Issues

#### Bot Not Responding
1. Check if bot is in the correct channel
2. Verify bot permissions
3. Check bot token validity

#### Music Not Playing
1. Ensure bot has voice permissions
2. Check if FFmpeg is installed
3. Verify internet connection

#### High Memory Usage
- The bot includes automatic memory management
- Restart if memory usage exceeds 500MB

### Logs
Check logs in `./logs/` directory:
- `err.log`: Error messages
- `out.log`: Standard output
- `combined.log`: All logs

### Performance Monitoring
The bot automatically logs performance every 5 minutes:
```
📊 Performance: 45MB/120MB | CPU: 0.15 | Uptime: 30m
```

## Production Deployment

### Using PM2
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# View logs
pm2 logs discord-music-bot-multi
```

### Using Docker
```bash
# Build image
docker build -t discord-music-bot .

# Run container
docker run -d --name music-bot discord-music-bot
```

## Support

For issues or questions:
1. Check the logs in `./logs/` directory
2. Verify your configuration in `.env`
3. Ensure all dependencies are installed
4. Check Discord bot permissions

## License

MIT License - see LICENSE file for details.