const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'loop',
  aliases: ['repeat'],
  description: 'Set loop mode for the queue',
  usage: '[off/song/queue]',
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

    const mode = args[0]?.toLowerCase();
    let newMode;

    if (!mode || mode === 'off') {
      newMode = 0;
    } else if (mode === 'song') {
      newMode = 1;
    } else if (mode === 'queue') {
      newMode = 2;
    } else {
      return message.reply('❌ Invalid mode! Use: off, song, or queue');
    }

    try {
      queue.setRepeatMode(newMode);
      
      const modeNames = ['Off', 'Song', 'Queue'];
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🔁 Loop Mode Changed')
        .setDescription(`Loop mode set to: **${modeNames[newMode]}**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Loop command error:', error);
      message.reply('❌ An error occurred while setting loop mode!');
    }
  }
};