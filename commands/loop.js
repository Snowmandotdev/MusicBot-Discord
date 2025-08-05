const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'loop',
  aliases: ['repeat'],
  description: 'Set loop mode for the queue',
  usage: '[off/song/queue]',
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
        .setTitle(botConfig.language === 'ar' ? '🔁 إعدادات التكرار' : '🔁 Loop Settings')
        .setDescription(botConfig.language === 'ar' 
          ? 'اختر وضع التكرار المطلوب من القائمة أدناه'
          : 'Select the desired loop mode from the menu below')
        .addFields(
          { 
            name: botConfig.language === 'ar' ? 'الوضع الحالي' : 'Current Mode', 
            value: queue.repeatMode === 0 ? (botConfig.language === 'ar' ? '🔂 معطل' : '🔂 Disabled') :
                    queue.repeatMode === 1 ? (botConfig.language === 'ar' ? '🔁 تكرار الأغنية' : '🔁 Song Loop') :
                    (botConfig.language === 'ar' ? '🔁 تكرار القائمة' : '🔁 Queue Loop'), 
            inline: true 
          },
          { 
            name: botConfig.language === 'ar' ? 'الخيارات المتاحة' : 'Available Options', 
            value: botConfig.language === 'ar' 
              ? '🔂 معطل | 🔁 أغنية | 🔁 قائمة'
              : '🔂 Disabled | 🔁 Song | 🔁 Queue', 
            inline: true 
          }
        )
        .setFooter({ text: config.embed.footer });

      // Create select menu for loop modes
      const loopSelect = new StringSelectMenuBuilder()
        .setCustomId('loop_mode')
        .setPlaceholder(botConfig.language === 'ar' ? 'اختر وضع التكرار' : 'Select loop mode')
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel(botConfig.language === 'ar' ? 'معطل' : 'Disabled')
            .setDescription(botConfig.language === 'ar' ? 'لا تكرار' : 'No loop')
            .setValue('0')
            .setEmoji('🔂'),
          new StringSelectMenuOptionBuilder()
            .setLabel(botConfig.language === 'ar' ? 'تكرار الأغنية' : 'Song Loop')
            .setDescription(botConfig.language === 'ar' ? 'تكرار الأغنية الحالية' : 'Repeat current song')
            .setValue('1')
            .setEmoji('🔁'),
          new StringSelectMenuOptionBuilder()
            .setLabel(botConfig.language === 'ar' ? 'تكرار القائمة' : 'Queue Loop')
            .setDescription(botConfig.language === 'ar' ? 'تكرار القائمة كاملة' : 'Repeat entire queue')
            .setValue('2')
            .setEmoji('🔁')
        );

      const row = new ActionRowBuilder().addComponents(loopSelect);

      return message.reply({ 
        embeds: [embed], 
        components: [row] 
      });
    }

    const mode = args[0]?.toLowerCase();
    let newMode;

    if (!mode || mode === 'off') {
      newMode = 0;
    } else if (mode === 'song') {
      newMode = 1;
    } else if (mode === 'queue') {
      newMode = 2;
    } else {
      const errorMsg = botConfig.language === 'ar' 
        ? '❌ وضع غير صحيح! استخدم: إيقاف، أغنية، أو قائمة'
        : '❌ Invalid mode! Use: off, song, or queue';
      return message.reply(errorMsg);
    }

    try {
      queue.setRepeatMode(newMode);
      
      const modeNames = botConfig.language === 'ar' 
        ? ['إيقاف', 'أغنية', 'قائمة']
        : ['Off', 'Song', 'Queue'];
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔁 تم تغيير وضع التكرار' : '🔁 Loop Mode Changed')
        .setDescription(`${language.messages.loopModeChanged} **${modeNames[newMode]}**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Loop command error:', error);
      message.reply(language.messages.error);
    }
  }
};