const { EmbedBuilder } = require('discord.js');
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

    try {
      const autoplay = queue.toggleAutoplay();
      const botConfig = client.botConfig;
      
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