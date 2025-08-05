const { spawn } = require('child_process');
const path = require('path');

console.log('🎵 Starting Professional Discord Music Bot...');

const bot = spawn('node', ['index.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

bot.on('error', (error) => {
  console.error('❌ Failed to start bot:', error);
  process.exit(1);
});

bot.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Bot process exited with code ${code}`);
    process.exit(code);
  }
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down bot...');
  bot.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down bot...');
  bot.kill('SIGTERM');
});