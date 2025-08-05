const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
    const page = args[0] ? parseInt(args[0]) : 1;
    const songsPerPage = 10;
    const totalPages = Math.ceil((queue.songs.length - 1) / songsPerPage);

    if (page < 1 || page > totalPages) {
      return message.reply(botConfig.language === 'ar' 
        ? '❌ رقم الصفحة غير صحيح!'
        : '❌ Invalid page number!');
    }

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '📋 قائمة الأغاني' : '📋 Music Queue')
      .setFooter({ text: config.embed.footer });

    if (queue.songs.length === 1) {
      embed.setDescription(botConfig.language === 'ar' ? 'لا توجد أغاني في القائمة' : 'No songs in queue');
    } else {
      const startIndex = (page - 1) * songsPerPage + 1;
      const endIndex = Math.min(startIndex + songsPerPage - 1, queue.songs.length - 1);
      
      const songs = queue.songs.slice(startIndex, endIndex + 1).map((song, index) => {
        const globalIndex = startIndex + index - 1;
        return `**${globalIndex}.** ${song.name} - \`${song.formattedDuration}\``;
      }).join('\n');

      embed.setDescription(songs);
      
      if (totalPages > 1) {
        embed.addFields({
          name: botConfig.language === 'ar' ? 'الصفحة' : 'Page',
          value: `${page}/${totalPages}`,
          inline: true
        });
      }
    }

    embed.addFields({
      name: botConfig.language === 'ar' ? 'الآن يعمل' : 'Now Playing',
      value: `**${queue.songs[0].name}** - \`${queue.songs[0].formattedDuration}\``,
      inline: false
    });

    // Queue control buttons
    const queueButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('queue_shuffle')
          .setLabel(botConfig.language === 'ar' ? '🔀 خلط' : '🔀 Shuffle')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('queue_clear')
          .setLabel(botConfig.language === 'ar' ? '🗑️ مسح' : '🗑️ Clear')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('queue_export')
          .setLabel(botConfig.language === 'ar' ? '📤 تصدير' : '📤 Export')
          .setStyle(ButtonStyle.Secondary)
      );

    // Navigation buttons
    const navButtons = new ActionRowBuilder();
    
    if (totalPages > 1) {
      navButtons.addComponents(
        new ButtonBuilder()
          .setCustomId(`queue_page_${Math.max(1, page - 1)}`)
          .setLabel('◀️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(page === 1),
        new ButtonBuilder()
          .setCustomId(`queue_page_${Math.min(totalPages, page + 1)}`)
          .setLabel('▶️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(page === totalPages)
      );
    }

    const components = [queueButtons];
    if (navButtons.components.length > 0) {
      components.push(navButtons);
    }

    message.reply({ 
      embeds: [embed], 
      components: components 
    });
  }
};