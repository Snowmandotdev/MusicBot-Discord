const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'current'],
  description: 'Show information about the currently playing song',
  cooldown: 3,
  guildOnly: true,
  async execute(message, args, client, language) {
    const queue = client.distube.getQueue(message.guild.id);
    
    if (!queue) {
      return message.reply(language.messages.nothingPlaying);
    }

    const song = queue.songs[0];
    const botConfig = client.botConfig;
    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '🎵 الآن يعمل' : '🎵 Now Playing')
      .setDescription(`**${song.name}**`)
      .addFields(
        { 
          name: botConfig.language === 'ar' ? 'المدة' : 'Duration', 
          value: song.formattedDuration, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'طلب بواسطة' : 'Requested by', 
          value: song.user.tag, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'مستوى الصوت' : 'Volume', 
          value: `${queue.volume}%`, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'القائمة' : 'Queue', 
          value: `${queue.songs.length - 1} ${botConfig.language === 'ar' ? 'أغاني' : 'songs'}`, 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'التكرار' : 'Loop', 
          value: queue.repeatMode ? (botConfig.language === 'ar' ? 'مفعل' : 'Enabled') : (botConfig.language === 'ar' ? 'معطل' : 'Disabled'), 
          inline: true 
        },
        { 
          name: botConfig.language === 'ar' ? 'التشغيل التلقائي' : 'Autoplay', 
          value: queue.autoplay ? (botConfig.language === 'ar' ? 'مفعل' : 'Enabled') : (botConfig.language === 'ar' ? 'معطل' : 'Disabled'), 
          inline: true 
        }
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: config.embed.footer });

    if (song.url) {
      embed.setURL(song.url);
    }

    message.reply({ embeds: [embed] });
  }
};