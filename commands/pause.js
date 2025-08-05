const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'pause',
  aliases: ['resume'],
  description: 'Pause or resume the current song',
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
      if (queue.paused) {
        queue.resume();
        message.reply(language.messages.playbackResumed);
      } else {
        queue.pause();
        message.reply(language.messages.playbackPaused);
      }
    } catch (error) {
      console.error('Pause command error:', error);
      message.reply(language.messages.error);
    }
  }
};