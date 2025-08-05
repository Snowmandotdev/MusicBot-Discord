const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = (client, distube) => {
  distube
    .on('playSong', (queue, song) => {
      const botConfig = client.botConfig;
      const language = config.languages[botConfig.language];
      
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
            name: botConfig.language === 'ar' ? 'القائمة' : 'Queue', 
            value: `${queue.songs.length - 1} ${botConfig.language === 'ar' ? 'أغاني' : 'songs'}`, 
            inline: true 
          }
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: config.embed.footer });
      
      queue.textChannel.send({ embeds: [embed] });
    })
    
    .on('addSong', (queue, song) => {
      const botConfig = client.botConfig;
      const language = config.languages[botConfig.language];
      
      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle(botConfig.language === 'ar' ? '✅ تم إضافة الأغنية' : '✅ Song Added')
        .setDescription(botConfig.language === 'ar' 
          ? `**${song.name}** تم إضافتها إلى القائمة`
          : `**${song.name}** has been added to the queue`)
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
            name: botConfig.language === 'ar' ? 'الموقع' : 'Position', 
            value: `${queue.songs.length - 1}`, 
            inline: true 
          }
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: config.embed.footer });
      
      queue.textChannel.send({ embeds: [embed] });
    })
    
    .on('error', (channel, error) => {
      const botConfig = client.botConfig;
      const language = config.languages[botConfig.language];
      
      const ErrorHandler = require('../utils/errorHandler');
      ErrorHandler.handleDisTubeError(error, channel);
    })
    
    .on('finish', (queue) => {
      const botConfig = client.botConfig;
      const message = botConfig.language === 'ar' ? '✅ انتهت القائمة!' : '✅ Queue finished!';
      queue.textChannel.send(message);
    })
    
    .on('disconnect', (queue) => {
      const botConfig = client.botConfig;
      const message = botConfig.language === 'ar' ? '👋 تم قطع الاتصال من الروم الصوتي!' : '👋 Disconnected from voice channel!';
      queue.textChannel.send(message);
    })
    
    .on('empty', (queue) => {
      const botConfig = client.botConfig;
      const message = botConfig.language === 'ar' ? '👋 الروم الصوتي فارغ! مغادرة...' : '👋 Voice channel is empty! Leaving...';
      queue.textChannel.send(message);
    });
};