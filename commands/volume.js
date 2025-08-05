const { EmbedBuilder } = require('discord.js');
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

    if (!args.length) {
      const botConfig = client.botConfig;
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔊 مستوى الصوت الحالي' : '🔊 Current Volume')
        .setDescription(`Volume: **${queue.volume}%**`)
        .setFooter({ text: config.embed.footer });
      
      return message.reply({ embeds: [embed] });
    }

    const volume = parseInt(args[0]);
    
    if (isNaN(volume) || volume < 0 || volume > 100) {
      const botConfig = client.botConfig;
      const errorMsg = botConfig.language === 'ar' 
        ? '❌ يرجى تقديم مستوى صوت صحيح بين 0 و 100!'
        : '❌ Please provide a valid volume between 0 and 100!';
      return message.reply(errorMsg);
    }

    try {
      queue.setVolume(volume);
      const botConfig = client.botConfig;
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