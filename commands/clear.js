const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'clear',
  aliases: ['cl'],
  description: 'Clear the music queue',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply('❌ There is nothing playing!');
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('❌ You need to be in a voice channel to use this command!');
    }

    if (queue.voiceChannel.id !== voiceChannel.id) {
      return message.reply('❌ You need to be in the same voice channel as the bot!');
    }

    try {
      const queueLength = queue.songs.length - 1;
      queue.songs.splice(1);
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🗑️ Queue Cleared')
        .setDescription(`Removed **${queueLength}** songs from the queue`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Clear command error:', error);
      message.reply('❌ An error occurred while clearing the queue!');
    }
  }
};