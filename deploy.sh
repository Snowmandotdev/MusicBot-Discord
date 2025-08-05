#!/bin/bash

echo "🎵 Professional Discord Music Bot - Deployment Script"
echo "=================================================="

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

# Check if config.js exists and has proper configuration
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
    echo "⚠️  Please edit .env file with your bot credentials"
fi

echo ""
echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit config.js or .env with your bot credentials"
echo "2. Run 'npm start' to start the bot"
echo "3. Run 'npm run dev' for development mode"
echo "4. Run 'npm run bot' for production mode with monitoring"
echo ""
echo "📚 For more information, see README.md"