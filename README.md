# Professional Discord Music Bot

A high-performance Discord music bot built with Discord.js, CommandKit, and DisTube. Supports YouTube, Spotify, and SoundCloud playback with advanced queue management and audio controls.

## Features

- 🎵 **Multi-Platform Support**: YouTube, Spotify, SoundCloud
- 🎚️ **Advanced Audio Controls**: Volume, pause/resume, skip
- 📋 **Queue Management**: View, loop, autoplay
- 🎨 **Professional UI**: Rich embeds with thumbnails and formatting
- ⚡ **High Performance**: Optimized for low latency and resource usage
- 🔧 **Modular Architecture**: Easy maintenance and scalability
- 🛡️ **Error Handling**: Robust error management and recovery

## Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `!play` | `!p` | Play music from YouTube, Spotify, or SoundCloud |
| `!skip` | `!s` | Skip the current song |
| `!stop` | `!leave`, `!disconnect` | Stop playback and clear queue |
| `!pause` | `!resume` | Pause or resume playback |
| `!queue` | `!q` | Show current music queue |
| `!volume` | `!vol` | Control playback volume |
| `!nowplaying` | `!np`, `!current` | Show current song info |
| `!loop` | `!repeat` | Set loop mode (off/song/queue) |
| `!autoplay` | `!ap` | Toggle autoplay mode |
| `!clear` | `!cl` | Clear the music queue |
| `!shuffle` | `!random` | Shuffle the music queue |
| `!help` | `!h`, `!commands` | Show all commands |

## Setup

### Prerequisites

- Node.js 18.0.0 or higher
- Discord Bot Token
- Spotify API credentials (optional, for enhanced Spotify support)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discord-music-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   - Copy `config.js` and update with your credentials
   - Set environment variables or update the config file directly

4. **Start the bot**
   ```bash
   npm start
   ```

### Configuration

Edit `config.js` with your bot credentials:

```javascript
module.exports = {
  token: 'YOUR_BOT_TOKEN',
  clientId: 'YOUR_CLIENT_ID',
  prefix: '!',
  
  spotify: {
    clientId: 'YOUR_SPOTIFY_CLIENT_ID',
    clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET'
  }
};
```

### Environment Variables

You can also use environment variables:

```bash
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
PREFIX=!
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

## Bot Permissions

The bot requires the following permissions:
- Send Messages
- Embed Links
- Connect
- Speak
- Use Voice Activity
- Read Message History

## Architecture

```
├── index.js              # Main bot file
├── config.js             # Configuration
├── commands/             # Command modules
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── pause.js
│   ├── queue.js
│   ├── volume.js
│   ├── nowplaying.js
│   ├── loop.js
│   ├── autoplay.js
│   └── help.js
├── events/               # Event handlers
│   ├── messageCreate.js
│   ├── ready.js
│   └── distube.js
└── package.json
```

## Performance Features

- **Efficient Queue Management**: Optimized for large playlists
- **Memory Management**: Automatic cleanup of completed songs
- **Error Recovery**: Graceful handling of network issues
- **Cooldown System**: Prevents spam and abuse
- **Resource Optimization**: Minimal CPU and memory usage

## Support

For support or questions, please refer to the documentation or create an issue in the repository.

## License

MIT License - see LICENSE file for details.