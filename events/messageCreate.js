const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || 
                   client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;
    
    if (command.guildOnly && !message.guild) {
      return message.reply('This command can only be used in servers!');
    }
    
    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !command.permissions.every(perm => authorPerms.has(perm))) {
        return message.reply('You do not have permission to use this command!');
      }
    }
    
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
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
        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
    
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    try {
      await command.execute(message, args, client);
    } catch (error) {
      const ErrorHandler = require('../utils/errorHandler');
      await ErrorHandler.handleCommandError(error, message, command.name);
    }
  });
};