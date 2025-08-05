const { ActivityType } = require('discord.js');
const config = require('../config');

module.exports = (client) => {
  client.once('ready', () => {
    const botConfig = client.botConfig;
    const language = config.languages[botConfig.language];
    
    // Set activity based on language
    const activityText = botConfig.language === 'ar' ? '🎵 أوامر الموسيقى' : '🎵 Music Commands';
    client.user.setActivity(activityText, { type: ActivityType.Listening });
    
    console.log(`✅ ${client.user.tag} (${botConfig.name}) is online and ready!`);
    console.log(`📊 Serving ${client.guilds.cache.size} guilds`);
    console.log(`👥 Serving ${client.users.cache.size} users`);
    console.log(`🌐 Language: ${botConfig.language.toUpperCase()}`);
    console.log(`📺 Channel: ${botConfig.channelId || 'All channels'}`);
  });
};