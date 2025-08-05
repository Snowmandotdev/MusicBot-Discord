const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Show the current music queue',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply('❌ There is nothing playing!');
    }

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle('🎵 Music Queue')
      .setFooter({ text: config.embed.footer });

    if (queue.songs.length === 1) {
      embed.setDescription('No songs in queue');
    } else {
      const songs = queue.songs.slice(1, 11).map((song, index) => {
        return `**${index + 1}.** ${song.name} - \`${song.formattedDuration}\``;
      }).join('\n');

      embed.setDescription(songs);
      
      if (queue.songs.length > 11) {
        embed.addFields({
          name: 'And more...',
          value: `${queue.songs.length - 11} more songs in queue`
        });
      }
    }

    embed.addFields({
      name: 'Now Playing',
      value: `**${queue.songs[0].name}** - \`${queue.songs[0].formattedDuration}\``,
      inline: false
    });

    message.reply({ embeds: [embed] });
  }
};