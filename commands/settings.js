const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'settings',
  aliases: ['config', 'setup'],
  description: 'Advanced bot settings',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const botConfig = client.botConfig;
    const queue = client.distube.getQueue(message.guild.id);

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '⚙️ إعدادات البوت' : '⚙️ Bot Settings')
      .setDescription(botConfig.language === 'ar' 
        ? 'إعدادات متقدمة للبوت والموسيقى'
        : 'Advanced settings for bot and music')
      .addFields(
        { 
          name: botConfig.language === 'ar' ? 'معلومات البوت' : 'Bot Info', 
          value: botConfig.language === 'ar' 
            ? `**الاسم:** ${botConfig.name}\n**اللغة:** ${botConfig.language === 'ar' ? 'العربية' : 'English'}\n**البادئة:** ${botConfig.prefix}`
            : `**Name:** ${botConfig.name}\n**Language:** ${botConfig.language === 'ar' ? 'Arabic' : 'English'}\n**Prefix:** ${botConfig.prefix}`, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'إعدادات الموسيقى' : 'Music Settings', 
          value: queue ? (botConfig.language === 'ar' 
            ? `**مستوى الصوت:** ${queue.volume}%\n**التكرار:** ${queue.repeatMode ? 'مفعل' : 'معطل'}\n**التشغيل التلقائي:** ${queue.autoplay ? 'مفعل' : 'معطل'}`
            : `**Volume:** ${queue.volume}%\n**Loop:** ${queue.repeatMode ? 'Enabled' : 'Disabled'}\n**Autoplay:** ${queue.autoplay ? 'Enabled' : 'Disabled'}`) : (botConfig.language === 'ar' 
            ? 'لا يوجد تشغيل حالياً'
            : 'No music playing'), 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'الميزات المتاحة' : 'Available Features', 
          value: botConfig.language === 'ar' 
            ? '• YouTube, Spotify, SoundCloud\n• أزرار تفاعلية\n• قوائم منسدلة\n• تحكم دقيق في الصوت\n• إدارة قائمة متقدمة'
            : '• YouTube, Spotify, SoundCloud\n• Interactive buttons\n• Dropdown menus\n• Fine volume control\n• Advanced queue management', 
          inline: false 
        }
      )
      .setFooter({ text: config.embed.footer });

    // Settings category buttons
    const categoryButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('settings_music')
          .setLabel(botConfig.language === 'ar' ? '🎵 موسيقى' : '🎵 Music')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('settings_volume')
          .setLabel(botConfig.language === 'ar' ? '🔊 صوت' : '🔊 Volume')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('settings_queue')
          .setLabel(botConfig.language === 'ar' ? '📋 قائمة' : '📋 Queue')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('settings_advanced')
          .setLabel(botConfig.language === 'ar' ? '⚙️ متقدم' : '⚙️ Advanced')
          .setStyle(ButtonStyle.Secondary)
      );

    // Quick actions
    const quickActions = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('settings_reset')
          .setLabel(botConfig.language === 'ar' ? '🔄 إعادة تعيين' : '🔄 Reset')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('settings_info')
          .setLabel(botConfig.language === 'ar' ? 'ℹ️ معلومات' : 'ℹ️ Info')
          .setStyle(ButtonStyle.Secondary)
      );

    message.reply({ 
      embeds: [embed], 
      components: [categoryButtons, quickActions] 
    });
  }
};