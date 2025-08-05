const { ActivityType } = require('discord.js');
const config = require('../config');

module.exports = (client) => {
  client.once('ready', () => {
    client.user.setActivity('🎵 Music Commands', { type: ActivityType.Listening });
    
    console.log(`✅ ${client.user.tag} is online and ready!`);
    console.log(`📊 Serving ${client.guilds.cache.size} guilds`);
    console.log(`👥 Serving ${client.users.cache.size} users`);
  });
};