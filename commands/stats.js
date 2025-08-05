const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');
const Analytics = require('../utils/analytics');

module.exports = {
  name: 'stats',
  aliases: ['analytics', 'info'],
  description: 'Show bot statistics and analytics',
  cooldown: 5,
  guildOnly: true,
  async execute(message, args, client, language) {
    const botConfig = client.botConfig;
    const analytics = new Analytics();
    const stats = analytics.getStats();

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '📊 إحصائيات البوت' : '📊 Bot Statistics')
      .setDescription(botConfig.language === 'ar' 
        ? 'إحصائيات شاملة عن استخدام البوت'
        : 'Comprehensive statistics about bot usage')
      .addFields(
        { 
          name: botConfig.language === 'ar' ? 'الأداء العام' : 'Overall Performance', 
          value: botConfig.language === 'ar' 
            ? `**وقت التشغيل:** ${stats.uptime}\n**إجمالي الأوامر:** ${stats.totalCommands}\n**إجمالي الأغاني:** ${stats.totalSongs}`
            : `**Uptime:** ${stats.uptime}\n**Total Commands:** ${stats.totalCommands}\n**Total Songs:** ${stats.totalSongs}`, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'المستخدمين والخوادم' : 'Users & Servers', 
          value: botConfig.language === 'ar' 
            ? `**المستخدمين النشطين:** ${stats.totalUsers}\n**الخوادم النشطة:** ${stats.totalServers}`
            : `**Active Users:** ${stats.totalUsers}\n**Active Servers:** ${stats.totalServers}`, 
          inline: true 
        }
      )
      .setFooter({ text: config.embed.footer });

    // Add top commands if available
    if (stats.topCommands.length > 0) {
      const topCommandsText = stats.topCommands
        .map(([cmd, count], index) => `${index + 1}. **${cmd}**: ${count}`)
        .join('\n');
      
      embed.addFields({
        name: botConfig.language === 'ar' ? '🏆 أفضل الأوامر' : '🏆 Top Commands',
        value: topCommandsText,
        inline: false
      });
    }

    // Add top songs if available
    if (stats.topSongs.length > 0) {
      const topSongsText = stats.topSongs
        .slice(0, 5)
        .map(([song, count], index) => `${index + 1}. **${song}**: ${count}`)
        .join('\n');
      
      embed.addFields({
        name: botConfig.language === 'ar' ? '🎵 أفضل الأغاني' : '🎵 Top Songs',
        value: topSongsText,
        inline: false
      });
    }

    // Statistics action buttons
    const statButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('stats_detailed')
          .setLabel(botConfig.language === 'ar' ? '📋 تفصيلي' : '📋 Detailed')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('stats_users')
          .setLabel(botConfig.language === 'ar' ? '👥 المستخدمين' : '👥 Users')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('stats_servers')
          .setLabel(botConfig.language === 'ar' ? '🏠 الخوادم' : '🏠 Servers')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('stats_export')
          .setLabel(botConfig.language === 'ar' ? '📤 تصدير' : '📤 Export')
          .setStyle(ButtonStyle.Secondary)
      );

    message.reply({ 
      embeds: [embed], 
      components: [statButtons] 
    });
  }
};