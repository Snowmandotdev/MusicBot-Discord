const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'stop',
  aliases: ['leave', 'disconnect'],
  description: 'Stop playing and clear the queue',
  cooldown: config.cooldowns.stop,
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
      queue.stop();
      message.reply('⏹️ Stopped playing and cleared the queue!');
    } catch (error) {
      console.error('Stop command error:', error);
      message.reply('❌ An error occurred while stopping playback!');
    }
  }
};