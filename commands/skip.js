const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  description: 'Skip the current song',
  cooldown: 1,
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
      await queue.skip();
      message.reply(language.messages.songSkipped);
    } catch (error) {
      console.error('Skip command error:', error);
      message.reply(language.messages.error);
    }
  }
};