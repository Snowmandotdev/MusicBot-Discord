module.exports = {
  token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  clientId: process.env.CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
  prefix: process.env.PREFIX || '!',
  
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_SPOTIFY_CLIENT_SECRET'
  },
  
  embed: {
    color: '#5865F2',
    footer: 'Music Bot | Professional Edition'
  },
  
  cooldowns: {
    play: 3000,
    skip: 1000,
    stop: 2000
  },
  
  maxQueueSize: 100,
  defaultVolume: 50,
  leaveTimeout: 300000
};