const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  description: 'Change the playback volume',
  usage: '[0-100]',
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

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🔊 Current Volume')
        .setDescription(`Volume: **${queue.volume}%**`)
        .setFooter({ text: config.embed.footer });
      
      return message.reply({ embeds: [embed] });
    }

    const volume = parseInt(args[0]);
    
    if (isNaN(volume) || volume < 0 || volume > 100) {
      return message.reply('❌ Please provide a valid volume between 0 and 100!');
    }

    try {
      queue.setVolume(volume);
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🔊 Volume Changed')
        .setDescription(`Volume set to: **${volume}%**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Volume command error:', error);
      message.reply('❌ An error occurred while changing volume!');
    }
  }
};