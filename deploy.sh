#!/bin/bash

echo "🎵 Professional Multi-Language Discord Music Bot - Deployment Script"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create logs directory
mkdir -p logs

# Check if config.js exists
if [ ! -f "config.js" ]; then
    echo "⚠️  config.js not found. Please create it with your bot credentials."
    echo "📝 Copy .env.example to .env and fill in your credentials"
    exit 1
fi

echo "✅ Configuration file found"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your bot credentials:"
    echo "   - BOT1_TOKEN, BOT1_CLIENT_ID, BOT1_CHANNEL_ID (Arabic bot)"
    echo "   - BOT2_TOKEN, BOT2_CLIENT_ID, BOT2_CHANNEL_ID (English bot)"
    echo "   - SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET (optional)"
fi

# Check if .env has been configured
if [ -f ".env" ]; then
    echo "📋 Checking .env configuration..."
    if grep -q "your_bot1_token_here" .env; then
        echo "⚠️  Please configure your bot tokens in .env file"
    else
        echo "✅ .env file appears to be configured"
    fi
fi

echo ""
echo "🚀 Multi-Bot Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your bot tokens and channel IDs"
echo "2. Run 'npm start' to start all bots"
echo "3. Run 'npm run dev' for development mode"
echo "4. Run 'npm run bot' for production mode with monitoring"
echo ""
echo "📚 Features:"
echo "   - Multi-bot system (Arabic & English)"
echo "   - Channel-specific responses"
echo "   - Full music platform support"
echo "   - Professional error handling"
echo ""
echo "📚 For more information, see README.md"