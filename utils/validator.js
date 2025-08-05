const config = require('../config');

class ConfigValidator {
  static validateBotConfig(botConfig) {
    const errors = [];
    
    if (!botConfig.token || botConfig.token === 'YOUR_BOT1_TOKEN_HERE') {
      errors.push(`❌ Invalid token for ${botConfig.name}`);
    }
    
    if (!botConfig.clientId || botConfig.clientId === 'YOUR_BOT1_CLIENT_ID_HERE') {
      errors.push(`❌ Invalid client ID for ${botConfig.name}`);
    }
    
    if (!botConfig.channelId || botConfig.channelId === 'YOUR_BOT1_CHANNEL_ID_HERE') {
      errors.push(`❌ Invalid channel ID for ${botConfig.name}`);
    }
    
    if (!['ar', 'en'].includes(botConfig.language)) {
      errors.push(`❌ Invalid language for ${botConfig.name}. Must be 'ar' or 'en'`);
    }
    
    return errors;
  }

  static validateAllConfigs() {
    const allErrors = [];
    
    config.bots.forEach((botConfig, index) => {
      const errors = this.validateBotConfig(botConfig);
      if (errors.length > 0) {
        allErrors.push(`Bot ${index + 1} (${botConfig.name}):`);
        allErrors.push(...errors);
        allErrors.push('');
      }
    });
    
    return allErrors;
  }

  static printValidationReport() {
    console.log('🔍 Validating bot configurations...');
    
    const errors = this.validateAllConfigs();
    
    if (errors.length === 0) {
      console.log('✅ All bot configurations are valid');
      return true;
    } else {
      console.log('❌ Configuration errors found:');
      errors.forEach(error => console.log(error));
      return false;
    }
  }
}

module.exports = ConfigValidator;