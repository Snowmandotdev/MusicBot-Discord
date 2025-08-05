const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'help',
  aliases: ['h', 'commands'],
  description: 'Show all available commands',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const botConfig = client.botConfig;
    const commands = client.commands;

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🎵 أوامر البوت الموسيقي' : '🎵 Music Bot Commands')
        .setDescription(botConfig.language === 'ar' 
          ? 'قائمة بجميع الأوامر المتاحة مع أزرار تفاعلية'
          : 'List of all available commands with interactive buttons')
        .addFields(
          { 
            name: botConfig.language === 'ar' ? '🎮 الأوامر التفاعلية' : '🎮 Interactive Commands', 
            value: botConfig.language === 'ar' 
              ? '`!تشغيل` `!تحكم` `!إعدادات` `!إحصائيات`'
              : '`!play` `!control` `!settings` `!stats`', 
            inline: true 
          },
          { 
            name: botConfig.language === 'ar' ? '🎵 أوامر الموسيقى' : '🎵 Music Commands', 
            value: botConfig.language === 'ar' 
              ? '`!صوت` `!تكرار` `!تشغيل تلقائي` `!قائمة`'
              : '`!volume` `!loop` `!autoplay` `!queue`', 
            inline: true 
          },
          { 
            name: botConfig.language === 'ar' ? '⚙️ أوامر التحكم' : '⚙️ Control Commands', 
            value: botConfig.language === 'ar' 
              ? '`!تخطي` `!إيقاف` `!إيقاف مؤقت` `!مسح` `!خلط`'
              : '`!skip` `!stop` `!pause` `!clear` `!shuffle`', 
            inline: true 
          }
        )
        .setFooter({ text: config.embed.footer });

      // Help action buttons
      const helpButtons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('help_interactive')
            .setLabel(botConfig.language === 'ar' ? '🎮 تفاعلي' : '🎮 Interactive')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('help_music')
            .setLabel(botConfig.language === 'ar' ? '🎵 موسيقى' : '🎵 Music')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('help_control')
            .setLabel(botConfig.language === 'ar' ? '⚙️ تحكم' : '⚙️ Control')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('help_support')
            .setLabel(botConfig.language === 'ar' ? '💬 دعم' : '💬 Support')
            .setStyle(ButtonStyle.Secondary)
        );

      return message.reply({ 
        embeds: [embed], 
        components: [helpButtons] 
      });
    }

    const commandName = args[0].toLowerCase();
    const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.reply(botConfig.language === 'ar' 
        ? '❌ الأمر غير موجود!'
        : '❌ Command not found!');
    }

    const commandEmbed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? `📖 معلومات الأمر: ${command.name}` : `📖 Command Info: ${command.name}`)
      .addFields(
        { 
          name: botConfig.language === 'ar' ? 'الوصف' : 'Description', 
          value: command.description, 
          inline: false 
        },
        { 
          name: botConfig.language === 'ar' ? 'الاستخدام' : 'Usage', 
          value: `\`${botConfig.prefix}${command.name} ${command.usage || ''}\``, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'الاختصارات' : 'Aliases', 
          value: command.aliases ? command.aliases.map(alias => `\`${alias}\``).join(', ') : botConfig.language === 'ar' ? 'لا توجد' : 'None', 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'وقت الانتظار' : 'Cooldown', 
          value: `${command.cooldown || 3} ثانية`, 
          inline: true 
        }
      )
      .setFooter({ text: config.embed.footer });

    message.reply({ embeds: [commandEmbed] });
  }
};