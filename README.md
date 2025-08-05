# Professional Multi-Language Discord Music Bot

A high-performance Discord music bot built with Discord.js and DisTube, supporting multiple bots with Arabic and English languages. Each bot responds only in its designated channel.

## Features

- 🎵 **Multi-Platform Support**: YouTube, Spotify, SoundCloud
- 🌐 **Multi-Language**: Arabic and English support
- 🤖 **Multi-Bot System**: Run multiple bots simultaneously
- 📺 **Channel Specific**: Each bot responds only in its designated channel
- 🎚️ **Advanced Audio Controls**: Volume, pause/resume, skip
- 📋 **Queue Management**: View, loop, autoplay, shuffle, clear
- 🎨 **Professional UI**: Rich embeds with thumbnails and formatting
- ⚡ **High Performance**: Optimized for low latency and resource usage
- 🔧 **Modular Architecture**: Easy maintenance and scalability
- 🛡️ **Error Handling**: Robust error management and recovery

## Multi-Bot Configuration

The bot supports running multiple instances simultaneously:

```javascript
bots: [
  {
    name: "Music Bot 1",
    token: "BOT1_TOKEN",
    clientId: "BOT1_CLIENT_ID", 
    channelId: "BOT1_CHANNEL_ID", // Only responds in this channel
    prefix: "!",
    language: "ar" // Arabic
  },
  {
    name: "Music Bot 2",
    token: "BOT2_TOKEN", 
    clientId: "BOT2_CLIENT_ID",
    channelId: "BOT2_CHANNEL_ID", // Only responds in this channel
    prefix: "!",
    language: "en" // English
  }
]
```

## Commands

### Arabic Commands (البوت العربي)
| Command | Aliases | Description |
|---------|---------|-------------|
| `!تشغيل` | `!شغل` | تشغيل أغنية من يوتيوب أو سبوتيفاي أو ساوند كلاود |
| `!تخطي` | `!تجاوز` | تخطي الأغنية الحالية |
| `!إيقاف` | `!توقف`, `!غادر` | إيقاف التشغيل ومسح القائمة |
| `!إيقاف مؤقت` | `!استئناف` | إيقاف مؤقت أو استئناف الأغنية |
| `!قائمة` | `!ق` | عرض قائمة الأغاني الحالية |
| `!صوت` | `!ص` | تغيير مستوى الصوت |
| `!الآن` | `!حالي` | عرض معلومات الأغنية الحالية |
| `!تكرار` | `!دورة` | تعيين وضع التكرار |
| `!تشغيل تلقائي` | `!تلقائي` | تبديل وضع التشغيل التلقائي |
| `!مسح` | `!حذف` | مسح قائمة الأغاني |
| `!خلط` | `!عشوائي` | خلط قائمة الأغاني |
| `!مساعدة` | `!ح`, `!أوامر` | عرض جميع الأوامر المتاحة |

### English Commands (English Bot)
| Command | Aliases | Description |
|---------|---------|-------------|
| `!play` | `!p` | Play music from YouTube, Spotify, or SoundCloud |
| `!skip` | `!s` | Skip the current song |
| `!stop` | `!leave`, `!disconnect` | Stop playing and clear the queue |
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
- Discord Bot Tokens (one for each bot)
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

3. **Configure the bots**
   - Copy `.env.example` to `.env`
   - Fill in your bot tokens and channel IDs
   - Update `config.js` if needed

4. **Start the bots**
   ```bash
   npm start
   ```

### Configuration

Edit `.env` with your bot credentials:

```bash
# Bot 1 (Arabic)
BOT1_TOKEN=your_bot1_token_here
BOT1_CLIENT_ID=your_bot1_client_id_here
BOT1_CHANNEL_ID=your_bot1_channel_id_here
BOT1_PREFIX=!

# Bot 2 (English)
BOT2_TOKEN=your_bot2_token_here
BOT2_CLIENT_ID=your_bot2_client_id_here
BOT2_CHANNEL_ID=your_bot2_channel_id_here
BOT2_PREFIX=!

# Spotify API (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

## Bot Permissions

Each bot requires the following permissions:
- Send Messages
- Embed Links
- Connect
- Speak
- Use Voice Activity
- Read Message History

## Architecture

```
├── index.js              # Multi-bot system
├── config.js             # Multi-bot configuration
├── package.json          # Dependencies and scripts
├── commands/             # All music commands (12 files)
├── events/               # Event handlers (3 files)
├── utils/                # Error handling utilities
├── deploy.sh             # Automated deployment script
├── ecosystem.config.js   # PM2 production config
├── start.js              # Enhanced startup script
├── README.md             # Comprehensive documentation
├── .env.example          # Environment template
└── .gitignore           # Git exclusions
```

## Performance Features

- **Multi-Bot Efficiency**: Each bot runs independently
- **Channel Isolation**: Bots only respond in designated channels
- **Language Optimization**: Separate language handling per bot
- **Memory Management**: Automatic cleanup of completed songs
- **Error Recovery**: Graceful handling of network issues
- **Cooldown System**: Prevents spam and abuse
- **Resource Optimization**: Minimal CPU and memory usage

## Support

For support or questions, please refer to the documentation or create an issue in the repository.

## License

MIT License - see LICENSE file for details.