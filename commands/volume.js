const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  description: 'Change the playback volume',
  usage: '[0-100]',
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
        .setTitle(botConfig.language === 'ar' ? '🔊 مستوى الصوت الحالي' : '🔊 Current Volume')
        .setDescription(`**${queue.volume}%**`)
        .addFields(
          { 
            name: botConfig.language === 'ar' ? 'التحكم السريع' : 'Quick Controls', 
            value: botConfig.language === 'ar' ? 'استخدم الأزرار أدناه للتحكم السريع' : 'Use the buttons below for quick control', 
            inline: false 
          }
        )
        .setFooter({ text: config.embed.footer });

      // Volume control buttons
      const volumeButtons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('volume_down')
            .setLabel('🔉 -10')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_up')
            .setLabel('🔊 +10')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_mute')
            .setLabel('🔇 Mute')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_max')
            .setLabel('🔊 Max')
            .setStyle(ButtonStyle.Secondary)
        );

      // Fine control buttons
      const fineButtons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('volume_25')
            .setLabel('25%')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_50')
            .setLabel('50%')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_75')
            .setLabel('75%')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('volume_100')
            .setLabel('100%')
            .setStyle(ButtonStyle.Secondary)
        );

      return message.reply({ 
        embeds: [embed], 
        components: [volumeButtons, fineButtons] 
      });
    }

    const volume = parseInt(args[0]);
    
    if (isNaN(volume) || volume < 0 || volume > 100) {
      const errorMsg = botConfig.language === 'ar' 
        ? '❌ يرجى تقديم مستوى صوت صحيح بين 0 و 100!'
        : '❌ Please provide a valid volume between 0 and 100!';
      return message.reply(errorMsg);
    }

    try {
      queue.setVolume(volume);
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔊 تم تغيير مستوى الصوت' : '🔊 Volume Changed')
        .setDescription(`${language.messages.volumeChanged} **${volume}%**`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Volume command error:', error);
      message.reply(language.messages.error);
    }
  }
};