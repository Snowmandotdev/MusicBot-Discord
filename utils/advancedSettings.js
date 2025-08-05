const fs = require('fs');
const path = require('path');

class AdvancedSettings {
  constructor() {
    this.settingsPath = path.join(__dirname, '../data/advanced-settings.json');
    this.ensureDataDirectory();
    this.loadSettings();
  }

  ensureDataDirectory() {
    const dir = path.dirname(this.settingsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  loadSettings() {
    try {
      if (fs.existsSync(this.settingsPath)) {
        this.settings = JSON.parse(fs.readFileSync(this.settingsPath, 'utf8'));
      } else {
        this.settings = {
          performance: {
            maxQueueSize: 100,
            defaultVolume: 50,
            leaveTimeout: 300000,
            maxSongDuration: 600000, // 10 minutes
            autoDisconnect: true
          },
          features: {
            autoplay: true,
            loop: true,
            shuffle: true,
            volumeControl: true,
            queueManagement: true,
            analytics: true
          },
          permissions: {
            requireVoiceChannel: true,
            requirePermissions: true,
            adminOnlyCommands: ['settings', 'stats'],
            moderatorCommands: ['clear', 'shuffle']
          },
          ui: {
            showThumbnails: true,
            showProgressBar: true,
            showQueuePagination: true,
            interactiveButtons: true,
            dropdownMenus: true
          }
        };
        this.saveSettings();
      }
    } catch (error) {
      console.error('Error loading advanced settings:', error);
      this.settings = this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      performance: {
        maxQueueSize: 100,
        defaultVolume: 50,
        leaveTimeout: 300000,
        maxSongDuration: 600000,
        autoDisconnect: true
      },
      features: {
        autoplay: true,
        loop: true,
        shuffle: true,
        volumeControl: true,
        queueManagement: true,
        analytics: true
      },
      permissions: {
        requireVoiceChannel: true,
        requirePermissions: true,
        adminOnlyCommands: ['settings', 'stats'],
        moderatorCommands: ['clear', 'shuffle']
      },
      ui: {
        showThumbnails: true,
        showProgressBar: true,
        showQueuePagination: true,
        interactiveButtons: true,
        dropdownMenus: true
      }
    };
  }

  saveSettings() {
    try {
      fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2));
    } catch (error) {
      console.error('Error saving advanced settings:', error);
    }
  }

  getSetting(category, key) {
    return this.settings[category]?.[key];
  }

  setSetting(category, key, value) {
    if (!this.settings[category]) {
      this.settings[category] = {};
    }
    this.settings[category][key] = value;
    this.saveSettings();
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  resetSettings() {
    this.settings = this.getDefaultSettings();
    this.saveSettings();
  }

  getPerformanceSettings() {
    return this.settings.performance;
  }

  getFeatureSettings() {
    return this.settings.features;
  }

  getPermissionSettings() {
    return this.settings.permissions;
  }

  getUISettings() {
    return this.settings.ui;
  }

  isFeatureEnabled(feature) {
    return this.settings.features[feature] === true;
  }

  isUIEnabled(uiElement) {
    return this.settings.ui[uiElement] === true;
  }

  isAdminCommand(command) {
    return this.settings.permissions.adminOnlyCommands.includes(command);
  }

  isModeratorCommand(command) {
    return this.settings.permissions.moderatorCommands.includes(command);
  }

  validateSettings() {
    const errors = [];
    
    // Validate performance settings
    if (this.settings.performance.maxQueueSize < 1 || this.settings.performance.maxQueueSize > 1000) {
      errors.push('maxQueueSize must be between 1 and 1000');
    }
    
    if (this.settings.performance.defaultVolume < 0 || this.settings.performance.defaultVolume > 100) {
      errors.push('defaultVolume must be between 0 and 100');
    }
    
    if (this.settings.performance.leaveTimeout < 10000 || this.settings.performance.leaveTimeout > 3600000) {
      errors.push('leaveTimeout must be between 10 seconds and 1 hour');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  exportSettings() {
    return {
      settings: this.settings,
      validation: this.validateSettings(),
      timestamp: new Date().toISOString()
    };
  }

  importSettings(settingsData) {
    try {
      this.settings = settingsData;
      this.saveSettings();
      return { success: true, message: 'Settings imported successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to import settings', error: error.message };
    }
  }
}

module.exports = AdvancedSettings;