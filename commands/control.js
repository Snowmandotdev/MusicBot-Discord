const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'control',
  aliases: ['ctrl', 'panel'],
  description: 'Advanced music control panel',
  cooldown: 3,
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
    const song = queue.songs[0];

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '🎛️ لوحة التحكم المتقدمة' : '🎛️ Advanced Control Panel')
      .setDescription(`**${song.name}**`)
      .addFields(
        { 
          name: botConfig.language === 'ar' ? 'المدة' : 'Duration', 
          value: song.formattedDuration, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'مستوى الصوت' : 'Volume', 
          value: `${queue.volume}%`, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'الحالة' : 'Status', 
          value: queue.paused ? (botConfig.language === 'ar' ? '⏸️ متوقف مؤقتاً' : '⏸️ Paused') : (botConfig.language === 'ar' ? '▶️ يعمل' : '▶️ Playing'), 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'التكرار' : 'Loop', 
          value: queue.repeatMode ? (botConfig.language === 'ar' ? '🔁 مفعل' : '🔁 Enabled') : (botConfig.language === 'ar' ? '🔂 معطل' : '🔂 Disabled'), 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'التشغيل التلقائي' : 'Autoplay', 
          value: queue.autoplay ? (botConfig.language === 'ar' ? '🔄 مفعل' : '🔄 Enabled') : (botConfig.language === 'ar' ? '⏹️ معطل' : '⏹️ Disabled'), 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'القائمة' : 'Queue', 
          value: `${queue.songs.length - 1} ${botConfig.language === 'ar' ? 'أغاني' : 'songs'}`, 
          inline: true 
        }
      )
      .setThumbnail(song.thumbnail)
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

    // Playback control buttons
    const playbackButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('previous')
          .setLabel('⏮️')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('pause_resume')
          .setLabel(queue.paused ? '▶️' : '⏸️')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('skip')
          .setLabel('⏭️')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('loop')
          .setLabel(queue.repeatMode ? '🔁' : '🔂')
          .setStyle(queue.repeatMode ? ButtonStyle.Success : ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('autoplay')
          .setLabel('🔄')
          .setStyle(queue.autoplay ? ButtonStyle.Success : ButtonStyle.Secondary)
      );

    // Queue control buttons
    const queueButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('shuffle')
          .setLabel(botConfig.language === 'ar' ? '🔀 خلط' : '🔀 Shuffle')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('clear')
          .setLabel(botConfig.language === 'ar' ? '🗑️ مسح' : '🗑️ Clear')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('queue')
          .setLabel(botConfig.language === 'ar' ? '📋 قائمة' : '📋 Queue')
          .setStyle(ButtonStyle.Secondary)
      );

    // Stop button
    const stopButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('stop')
          .setLabel(botConfig.language === 'ar' ? '⏹️ إيقاف كامل' : '⏹️ Stop All')
          .setStyle(ButtonStyle.Danger)
      );

    message.reply({ 
      embeds: [embed], 
      components: [volumeButtons, playbackButtons, queueButtons, stopButton] 
    });
  }
};