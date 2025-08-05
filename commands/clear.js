const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'clear',
  aliases: ['cl'],
  description: 'Clear the music queue',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply(language.messages.nothingPlaying);
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply(language.messages.notInVoiceChannel);
    }

    if (queue.voiceChannel.id !== voiceChannel.id) {
      return message.reply(language.messages.notInSameChannel);
    }

    try {
      const queueLength = queue.songs.length - 1;
      queue.songs.splice(1);
      const botConfig = client.botConfig;
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🗑️ تم مسح القائمة' : '🗑️ Queue Cleared')
        .setDescription(botConfig.language === 'ar' 
          ? `تم حذف **${queueLength}** أغنية من القائمة`
          : `Removed **${queueLength}** songs from the queue`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Clear command error:', error);
      message.reply(language.messages.error);
    }
  }
};