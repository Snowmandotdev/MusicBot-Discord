const fs = require('fs');
const path = require('path');

class Analytics {
  constructor() {
    this.dataPath = path.join(__dirname, '../data/analytics.json');
    this.ensureDataDirectory();
    this.loadData();
  }

  ensureDataDirectory() {
    const dir = path.dirname(this.dataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataPath)) {
        this.data = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
      } else {
        this.data = {
          commands: {},
          songs: {},
          users: {},
          servers: {},
          performance: {
            startTime: Date.now(),
            totalCommands: 0,
            totalSongs: 0,
            totalUsers: 0,
            totalServers: 0
          }
        };
        this.saveData();
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      this.data = {
        commands: {},
        songs: {},
        users: {},
        servers: {},
        performance: {
          startTime: Date.now(),
          totalCommands: 0,
          totalSongs: 0,
          totalUsers: 0,
          totalServers: 0
        }
      };
    }
  }

  saveData() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  trackCommand(commandName, userId, guildId) {
    if (!this.data.commands[commandName]) {
      this.data.commands[commandName] = 0;
    }
    this.data.commands[commandName]++;
    this.data.performance.totalCommands++;

    if (!this.data.users[userId]) {
      this.data.users[userId] = { commands: 0, songs: 0 };
    }
    this.data.users[userId].commands++;

    if (!this.data.servers[guildId]) {
      this.data.servers[guildId] = { commands: 0, songs: 0 };
    }
    this.data.servers[guildId].commands++;

    this.saveData();
  }

  trackSong(songName, userId, guildId) {
    if (!this.data.songs[songName]) {
      this.data.songs[songName] = 0;
    }
    this.data.songs[songName]++;
    this.data.performance.totalSongs++;

    if (!this.data.users[userId]) {
      this.data.users[userId] = { commands: 0, songs: 0 };
    }
    this.data.users[userId].songs++;

    if (!this.data.servers[guildId]) {
      this.data.servers[guildId] = { commands: 0, songs: 0 };
    }
    this.data.servers[guildId].songs++;

    this.saveData();
  }

  getTopCommands(limit = 10) {
    return Object.entries(this.data.commands)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);
  }

  getTopSongs(limit = 10) {
    return Object.entries(this.data.songs)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);
  }

  getTopUsers(limit = 10) {
    return Object.entries(this.data.users)
      .sort(([,a], [,b]) => (b.commands + b.songs) - (a.commands + a.songs))
      .slice(0, limit);
  }

  getTopServers(limit = 10) {
    return Object.entries(this.data.servers)
      .sort(([,a], [,b]) => (b.commands + b.songs) - (a.commands + a.songs))
      .slice(0, limit);
  }

  getStats() {
    const uptime = Date.now() - this.data.performance.startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    return {
      uptime: `${hours}h ${minutes}m`,
      totalCommands: this.data.performance.totalCommands,
      totalSongs: this.data.performance.totalSongs,
      totalUsers: Object.keys(this.data.users).length,
      totalServers: Object.keys(this.data.servers).length,
      topCommands: this.getTopCommands(5),
      topSongs: this.getTopSongs(5)
    };
  }

  generateReport() {
    const stats = this.getStats();
    return {
      summary: stats,
      topCommands: this.getTopCommands(),
      topSongs: this.getTopSongs(),
      topUsers: this.getTopUsers(),
      topServers: this.getTopServers()
    };
  }
}

module.exports = Analytics;