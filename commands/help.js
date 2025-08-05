const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'help',
  aliases: ['h', 'commands'],
  description: 'Show all available commands',
  cooldown: 3,
  async execute(message, args, client) {
    const commands = client.commands;
    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle('🎵 Music Bot Commands')
      .setDescription('Here are all the available commands:')
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
      const aliases = cmd.aliases ? ` (${cmd.aliases.join(', ')})` : '';
      const usage = cmd.usage ? ` \`${config.prefix}${cmd.name} ${cmd.usage}\`` : ` \`${config.prefix}${cmd.name}\``;
      musicCommandsText += `**${cmd.name}**${aliases}\n${cmd.description}${usage}\n\n`;
    });

    embed.addFields({
      name: '🎵 Music Commands',
      value: musicCommandsText,
      inline: false
    });

    embed.addFields({
      name: '📝 Usage',
      value: `Use \`${config.prefix}help [command]\` for detailed information about a specific command.`,
      inline: false
    });

    message.reply({ embeds: [embed] });
  }
};