const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play a song from YouTube, Spotify, or SoundCloud',
  usage: '<song name or URL>',
  cooldown: config.cooldowns.play,
  guildOnly: true,
  async execute(message, args, client) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('❌ You need to be in a voice channel to play music!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return message.reply('❌ I need permissions to join and speak in your voice channel!');
    }

    if (!args.length) {
      return message.reply('❌ Please provide a song name or URL!');
    }

    const query = args.join(' ');
    
    try {
      await client.distube.play(voiceChannel, query, {
        member: message.member,
        textChannel: message.channel,
        message
      });
    } catch (error) {
      console.error('Play command error:', error);
      message.reply('❌ An error occurred while trying to play the song!');
    }
  }
};