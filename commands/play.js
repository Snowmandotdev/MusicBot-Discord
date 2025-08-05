const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play a song from YouTube, Spotify, or SoundCloud',
  usage: '<song name or URL>',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply(language.messages.notInVoiceChannel);
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return message.reply(language.messages.noPermission);
    }

    if (!args.length) {
      return message.reply(language.messages.needSongName);
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
      message.reply(language.messages.error);
    }
  }
};