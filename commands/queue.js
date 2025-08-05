const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Show the current music queue',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply(language.messages.nothingPlaying);
    }

    const botConfig = client.botConfig;
    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '📋 قائمة الأغاني' : '📋 Music Queue')
      .setFooter({ text: config.embed.footer });

    if (queue.songs.length === 1) {
      embed.setDescription(botConfig.language === 'ar' ? 'لا توجد أغاني في القائمة' : 'No songs in queue');
    } else {
      const songs = queue.songs.slice(1, 11).map((song, index) => {
        return `**${index + 1}.** ${song.name} - \`${song.formattedDuration}\``;
      }).join('\n');

      embed.setDescription(songs);
      
      if (queue.songs.length > 11) {
        embed.addFields({
          name: botConfig.language === 'ar' ? 'والمزيد...' : 'And more...',
          value: botConfig.language === 'ar' 
            ? `${queue.songs.length - 11} أغاني أخرى في القائمة`
            : `${queue.songs.length - 11} more songs in queue`
        });
      }
    }

    embed.addFields({
      name: botConfig.language === 'ar' ? 'الآن يعمل' : 'Now Playing',
      value: `**${queue.songs[0].name}** - \`${queue.songs[0].formattedDuration}\``,
      inline: false
    });

    message.reply({ embeds: [embed] });
  }
};