const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = (client, distube) => {
  distube
    .on('playSong', (queue, song) => {
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('🎵 Now Playing')
        .setDescription(`**${song.name}**`)
        .addFields(
          { name: 'Duration', value: song.formattedDuration, inline: true },
          { name: 'Requested by', value: song.user.tag, inline: true },
          { name: 'Queue', value: `${queue.songs.length - 1} songs`, inline: true }
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: config.embed.footer });
      
      queue.textChannel.send({ embeds: [embed] });
    })
    
    .on('addSong', (queue, song) => {
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle('✅ Song Added')
        .setDescription(`**${song.name}** has been added to the queue`)
        .addFields(
          { name: 'Duration', value: song.formattedDuration, inline: true },
          { name: 'Requested by', value: song.user.tag, inline: true },
          { name: 'Position', value: `${queue.songs.length - 1}`, inline: true }
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: config.embed.footer });
      
      queue.textChannel.send({ embeds: [embed] });
    })
    
    .on('error', (channel, error) => {
      const ErrorHandler = require('../utils/errorHandler');
      ErrorHandler.handleDisTubeError(error, channel);
    })
    
    .on('finish', (queue) => {
      queue.textChannel.send('✅ Queue finished!');
    })
    
    .on('disconnect', (queue) => {
      queue.textChannel.send('👋 Disconnected from voice channel!');
    })
    
    .on('empty', (queue) => {
      queue.textChannel.send('👋 Voice channel is empty! Leaving...');
    });
};