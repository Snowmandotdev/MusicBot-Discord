const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'shuffle',
  aliases: ['random'],
  description: 'Shuffle the music queue',
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

    if (queue.songs.length <= 2) {
      const botConfig = client.botConfig;
      const errorMsg = botConfig.language === 'ar' 
        ? '❌ تحتاج إلى أغانٍ على الأقل في القائمة للخلط!'
        : '❌ Need at least 2 songs in queue to shuffle!';
      return message.reply(errorMsg);
    }

    try {
      queue.shuffle();
      const botConfig = client.botConfig;
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '🔀 تم خلط القائمة' : '🔀 Queue Shuffled')
        .setDescription(botConfig.language === 'ar' 
          ? `تم خلط **${queue.songs.length - 1}** أغنية في القائمة`
          : `Shuffled **${queue.songs.length - 1}** songs in the queue`)
        .setFooter({ text: config.embed.footer });
      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Shuffle command error:', error);
      message.reply(language.messages.error);
    }
  }
};