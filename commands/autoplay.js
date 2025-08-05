const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  description: 'Toggle autoplay mode',
  cooldown: 2,
  guildOnly: true,
  async execute(message, args, client, language) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply(language.messages.nothingPlaying);
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply(language.messages.notInVoiceChannel);
    }

    if (queue.voiceChannel.id !== voiceChannel.id) {
      return message.reply(language.messages.notInSameChannel);
    }

    const botConfig = client.botConfig;

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔄 إعدادات التشغيل التلقائي' : '🔄 Autoplay Settings')
        .setDescription(botConfig.language === 'ar' 
          ? 'التشغيل التلقائي يضيف أغاني مشابهة تلقائياً عند انتهاء القائمة'
          : 'Autoplay automatically adds similar songs when the queue ends')
        .addFields(
          { 
            name: botConfig.language === 'ar' ? 'الحالة الحالية' : 'Current Status', 
            value: queue.autoplay ? (botConfig.language === 'ar' ? '🔄 مفعل' : '🔄 Enabled') : (botConfig.language === 'ar' ? '⏹️ معطل' : '⏹️ Disabled'), 
            inline: true 
          },
          { 
            name: botConfig.language === 'ar' ? 'الميزات' : 'Features', 
            value: botConfig.language === 'ar' 
              ? '• إضافة أغاني مشابهة\n• استمرارية التشغيل\n• تنوع في الموسيقى'
              : '• Add similar songs\n• Continuous playback\n• Music variety', 
            inline: true 
          }
        )
        .setFooter({ text: config.embed.footer });

      // Autoplay control buttons
      const autoplayButtons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('autoplay_toggle')
            .setLabel(queue.autoplay ? (botConfig.language === 'ar' ? '⏹️ إيقاف' : '⏹️ Disable') : (botConfig.language === 'ar' ? '🔄 تفعيل' : '🔄 Enable'))
            .setStyle(queue.autoplay ? ButtonStyle.Danger : ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('autoplay_info')
            .setLabel(botConfig.language === 'ar' ? 'ℹ️ معلومات' : 'ℹ️ Info')
            .setStyle(ButtonStyle.Secondary)
        );

      return message.reply({ 
        embeds: [embed], 
        components: [autoplayButtons] 
      });
    }

    try {
      const autoplay = queue.toggleAutoplay();
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔄 تم تبديل التشغيل التلقائي' : '🔄 Autoplay Toggled')
        .setDescription(`${language.messages.autoplayToggled} **${autoplay ? (botConfig.language === 'ar' ? 'مفعل' : 'Enabled') : (botConfig.language === 'ar' ? 'معطل' : 'Disabled')}**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Autoplay command error:', error);
      message.reply(language.messages.error);
    }
  }
};