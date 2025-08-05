const fs = require('fs');
const path = require('path');

class SettingsManager {
  constructor() {
    this.settingsPath = path.join(__dirname, '../settings.json');
    this.defaultSettings = {
      maxQueueSize: 100,
      defaultVolume: 50,
      leaveTimeout: 300000,
      cooldowns: {
        play: 3000,
        skip: 1000,
        stop: 2000
      },
      embed: {
        color: '#5865F2',
        footer: 'Music Bot | Professional Edition'
      }
    };
    this.settings = this.loadSettings();
  }

  loadSettings() {
    try {
      if (fs.existsSync(this.settingsPath)) {
        const data = fs.readFileSync(this.settingsPath, 'utf8');
        return { ...this.defaultSettings, ...JSON.parse(data) };
      } else {
        this.saveSettings(this.defaultSettings);
        return this.defaultSettings;
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.defaultSettings;
    }
  }

  saveSettings(settings) {
    try {
      fs.writeFileSync(this.settingsPath, JSON.stringify(settings, null, 2));
      this.settings = settings;
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
    return this.saveSettings(this.settings);
  }

  update(updates) {
    this.settings = { ...this.settings, ...updates };
    return this.saveSettings(this.settings);
  }

  reset() {
    return this.saveSettings(this.defaultSettings);
  }

  getSettings() {
    return this.settings;
  }
}

module.exports = SettingsManager;