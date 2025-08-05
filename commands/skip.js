const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  description: 'Skip the current song',
  cooldown: config.cooldowns.skip,
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
      await queue.skip();
      message.reply('⏭️ Skipped the current song!');
    } catch (error) {
      console.error('Skip command error:', error);
      message.reply('❌ An error occurred while skipping the song!');
    }
  }
};