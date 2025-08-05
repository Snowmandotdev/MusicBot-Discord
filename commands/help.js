const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'help',
  aliases: ['h', 'commands'],
  description: 'Show all available commands',
  cooldown: 3,
  async execute(message, args, client, language) {
    const botConfig = client.botConfig;
    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(botConfig.language === 'ar' ? '🎵 أوامر بوت الموسيقى' : '🎵 Music Bot Commands')
      .setDescription(botConfig.language === 'ar' ? 'هنا جميع الأوامر المتاحة:' : 'Here are all the available commands:')
      .setFooter({ text: config.embed.footer });

    const musicCommands = [
      { name: 'play', aliases: ['p'], description: 'Play a song from YouTube, Spotify, or SoundCloud', usage: '<song name or URL>' },
      { name: 'skip', aliases: ['s'], description: 'Skip the current song' },
      { name: 'stop', aliases: ['leave', 'disconnect'], description: 'Stop playing and clear the queue' },
      { name: 'pause', aliases: ['resume'], description: 'Pause or resume the current song' },
      { name: 'queue', aliases: ['q'], description: 'Show the current music queue' },
      { name: 'volume', aliases: ['vol'], description: 'Change the playback volume', usage: '[0-100]' },
      { name: 'nowplaying', aliases: ['np', 'current'], description: 'Show information about the currently playing song' },
      { name: 'loop', aliases: ['repeat'], description: 'Set loop mode for the queue', usage: '[off/song/queue]' },
      { name: 'autoplay', aliases: ['ap'], description: 'Toggle autoplay mode' },
      { name: 'clear', aliases: ['cl'], description: 'Clear the music queue' },
      { name: 'shuffle', aliases: ['random'], description: 'Shuffle the music queue' }
    ];

    let musicCommandsText = '';
    musicCommands.forEach(cmd => {
      const langCmd = language.commands[cmd.name];
      const commandName = langCmd ? langCmd.name : cmd.name;
      const aliases = langCmd?.aliases || cmd.aliases;
      const aliasesText = aliases ? ` (${aliases.join(', ')})` : '';
      const usage = langCmd?.usage || cmd.usage;
      const usageText = usage ? ` \`${botConfig.prefix}${commandName} ${usage}\`` : ` \`${botConfig.prefix}${commandName}\``;
      
      musicCommandsText += `**${commandName}**${aliasesText}\n${langCmd?.description || cmd.description}${usageText}\n\n`;
    });

    embed.addFields({
      name: botConfig.language === 'ar' ? '🎵 أوامر الموسيقى' : '🎵 Music Commands',
      value: musicCommandsText,
      inline: false
    });

    embed.addFields({
      name: '📝 Usage',
      value: botConfig.language === 'ar' 
        ? `استخدم \`${botConfig.prefix}help [أمر]\` للحصول على معلومات مفصلة عن أمر معين.`
        : `Use \`${botConfig.prefix}help [command]\` for detailed information about a specific command.`,
      inline: false
    });

    message.reply({ embeds: [embed] });
  }
};