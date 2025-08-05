const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  description: 'Toggle autoplay mode',
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
      const autoplay = queue.toggleAutoplay();
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🔄 Autoplay Toggled')
        .setDescription(`Autoplay is now: **${autoplay ? 'Enabled' : 'Disabled'}**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Autoplay command error:', error);
      message.reply('❌ An error occurred while toggling autoplay!');
    }
  }
};