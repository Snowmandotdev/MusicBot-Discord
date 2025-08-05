const { EmbedBuilder } = require('discord.js');
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

    const mode = args[0]?.toLowerCase();
    let newMode;
    const botConfig = client.botConfig;

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