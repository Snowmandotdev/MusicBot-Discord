const { EmbedBuilder } = require('discord.js');
const config = require('../config');

class ErrorHandler {
  static async handleCommandError(error, message, commandName) {
    console.error(`Error in command ${commandName}:`, error);
    
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('❌ Error')
      .setDescription('An error occurred while executing the command.')
      .setFooter({ text: config.embed.footer });
    
    try {
      await message.reply({ embeds: [embed] });
    } catch (replyError) {
      console.error('Failed to send error message:', replyError);
    }
  }

  static async handleDisTubeError(error, channel) {
    console.error('DisTube error:', error);
    
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('❌ Music Error')
      .setDescription('An error occurred while playing music.')
      .setFooter({ text: config.embed.footer });
    
    try {
      await channel.send({ embeds: [embed] });
    } catch (sendError) {
      console.error('Failed to send error message:', sendError);
    }
  }

  static logError(error, context = '') {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${context}:`, error);
  }
}

module.exports = ErrorHandler;