const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'current'],
  description: 'Show information about the currently playing song',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply('❌ There is nothing playing!');
    }

    const song = queue.songs[0];
    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle('🎵 Now Playing')
      .setDescription(`**${song.name}**`)
      .addFields(
        { name: 'Duration', value: song.formattedDuration, inline: true },
        { name: 'Requested by', value: song.user.tag, inline: true },
        { name: 'Volume', value: `${queue.volume}%`, inline: true },
        { name: 'Queue', value: `${queue.songs.length - 1} songs`, inline: true },
        { name: 'Loop', value: queue.repeatMode ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Autoplay', value: queue.autoplay ? 'Enabled' : 'Disabled', inline: true }
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: config.embed.footer });

    if (song.url) {
      embed.setURL(song.url);
    }

    message.reply({ embeds: [embed] });
  }
};