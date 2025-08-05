require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const PerformanceMonitor = require('./utils/performance');
const ConfigValidator = require('./utils/validator');

class MusicBot {
  constructor(botConfig) {
    this.config = botConfig;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });

    this.client.commands = new Collection();
    this.client.cooldowns = new Collection();
    this.client.botConfig = botConfig;

    const distube = new DisTube(this.client, {
      leaveOnStop: false,
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin({
          emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
      ]
    });

    this.client.distube = distube;
    this.loadCommands();
    this.loadEvents();
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      
      if ('name' in command && 'execute' in command) {
        this.client.commands.set(command.name, command);
      }
    }
  }

  loadEvents() {
    require('./events/messageCreate')(this.client);
    require('./events/ready')(this.client);
    require('./events/distube')(this.client, this.client.distube);
  }

  start() {
    this.client.login(this.config.token);
  }
}

// Validate configurations
if (!ConfigValidator.printValidationReport()) {
  console.log('❌ Please fix configuration errors before starting bots');
  process.exit(1);
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Start all bots
config.bots.forEach(botConfig => {
  const bot = new MusicBot(botConfig);
  bot.start();
  
  console.log(`🚀 Starting ${botConfig.name} (${botConfig.language})`);
});

console.log(`🎵 Multi-Bot Music System - ${config.bots.length} bots initialized`);

// Performance monitoring
setInterval(() => {
  performanceMonitor.logPerformance();
  performanceMonitor.checkMemoryUsage();
}, 300000); // Every 5 minutes

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down multi-bot system...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down multi-bot system...');
  process.exit(0);
});