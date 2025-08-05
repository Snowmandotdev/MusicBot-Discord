const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'shuffle',
  aliases: ['random'],
  description: 'Shuffle the music queue',
  cooldown: 3,
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

    if (queue.songs.length <= 2) {
      return message.reply('❌ Need at least 2 songs in queue to shuffle!');
    }

    try {
      queue.shuffle();
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🔀 Queue Shuffled')
        .setDescription(`Shuffled **${queue.songs.length - 1}** songs in the queue`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Shuffle command error:', error);
      message.reply('❌ An error occurred while shuffling the queue!');
    }
  }
};