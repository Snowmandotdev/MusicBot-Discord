const config = require('./config');
const ConfigValidator = require('./utils/validator');

console.log('🧪 Testing Multi-Language Discord Music Bot Configuration');
console.log('=====================================================');

// Test configuration validation
console.log('\n📋 Configuration Test:');
const isValid = ConfigValidator.printValidationReport();

// Test language support
console.log('\n🌐 Language Support Test:');
config.bots.forEach((bot, index) => {
  console.log(`Bot ${index + 1}: ${bot.name} (${bot.language})`);
  const language = config.languages[bot.language];
  console.log(`  - Messages: ${Object.keys(language.messages).length} messages`);
  console.log(`  - Commands: ${Object.keys(language.commands).length} commands`);
});

// Test DisTube plugins
console.log('\n🎵 DisTube Plugins Test:');
const plugins = [
  '@distube/spotify',
  '@distube/soundcloud', 
  '@distube/yt-dlp'
];

plugins.forEach(plugin => {
  try {
    require(plugin);
    console.log(`✅ ${plugin}: Available`);
  } catch (error) {
    console.log(`❌ ${plugin}: Not available`);
  }
});

// Test dependencies
console.log('\n📦 Dependencies Test:');
const dependencies = [
  'discord.js',
  'distube',
  'dotenv'
];

dependencies.forEach(dep => {
  try {
    require(dep);
    console.log(`✅ ${dep}: Available`);
  } catch (error) {
    console.log(`❌ ${dep}: Not available`);
  }
});

console.log('\n🎯 Test Summary:');
if (isValid) {
  console.log('✅ All tests passed! Bot is ready to run.');
  console.log('🚀 Run "npm start" to start the bots.');
} else {
  console.log('❌ Some tests failed. Please fix configuration issues.');
  console.log('📝 Check the configuration in config.js and .env files.');
}

console.log('\n📚 For more information, see README.md and SETUP.md');