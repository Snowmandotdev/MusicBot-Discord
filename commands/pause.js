const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'pause',
  aliases: ['resume'],
  description: 'Pause or resume the current song',
  cooldown: 2,
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
      if (queue.paused) {
        queue.resume();
        message.reply('▶️ Resumed the song!');
      } else {
        queue.pause();
        message.reply('⏸️ Paused the song!');
      }
    } catch (error) {
      console.error('Pause command error:', error);
      message.reply('❌ An error occurred while pausing/resuming!');
    }
  }
};