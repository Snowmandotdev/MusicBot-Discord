const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    
    const botConfig = client.botConfig;
    const language = config.languages[botConfig.language];
    const prefix = botConfig.prefix;
    
    // Check if message is in the specified channel
    if (botConfig.channelId && message.channel.id !== botConfig.channelId) {
      return;
    }
    
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Get command with language support
    let command = client.commands.get(commandName);
    
    // Check for language-specific command names
    if (!command) {
      for (const [cmdName, cmd] of client.commands.entries()) {
        const langCmd = language.commands[cmdName];
        if (langCmd && (langCmd.name === commandName || langCmd.aliases?.includes(commandName))) {
          command = cmd;
          break;
        }
      }
    }
    
    if (!command) return;
    
    if (command.guildOnly && !message.guild) {
      return message.reply(language.messages.noPermission);
    }
    
    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !command.permissions.every(perm => authorPerms.has(perm))) {
        return message.reply(language.messages.noPermission);
      }
    }
    
    if (command.args && !args.length) {
      let reply = language.messages.needSongName;
      
      if (command.usage) {
        const langCmd = language.commands[command.name];
        const usage = langCmd?.usage || command.usage;
        reply += `\nالاستخدام الصحيح: \`${prefix}${command.name} ${usage}\``;
      }
      
      return message.reply(reply);
    }
    
    const { cooldowns } = client;
    
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Map());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`⏳ يرجى الانتظار ${timeLeft.toFixed(1)} ثانية قبل استخدام الأمر \`${command.name}\` مرة أخرى.`);
      }
    }
    
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    try {
      await command.execute(message, args, client, language);
    } catch (error) {
      const ErrorHandler = require('../utils/errorHandler');
      await ErrorHandler.handleCommandError(error, message, command.name);
    }
  });
};