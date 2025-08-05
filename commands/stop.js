const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'stop',
  aliases: ['leave', 'disconnect'],
  description: 'Stop playing and clear the queue',
  cooldown: 2,
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
      queue.stop();
      message.reply(language.messages.playbackStopped);
    } catch (error) {
      console.error('Stop command error:', error);
      message.reply(language.messages.error);
    }
  }
};