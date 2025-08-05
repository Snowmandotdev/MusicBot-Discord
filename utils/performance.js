const os = require('os');

class PerformanceMonitor {
  constructor() {
    this.startTime = Date.now();
    this.memoryUsage = process.memoryUsage();
  }

  getSystemInfo() {
    return {
      uptime: Date.now() - this.startTime,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      cpu: {
        load: os.loadavg(),
        cores: os.cpus().length
      },
      platform: {
        type: os.type(),
        release: os.release(),
        arch: os.arch()
      }
    };
  }

  logPerformance() {
    const info = this.getSystemInfo();
    console.log(`📊 Performance: ${info.memory.used}MB/${info.memory.total}MB | CPU: ${info.cpu.load[0].toFixed(2)} | Uptime: ${Math.round(info.uptime / 1000 / 60)}m`);
  }

  checkMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    const heapUsed = memoryUsage.heapUsed / 1024 / 1024;
    
    if (heapUsed > 500) {
      console.warn(`⚠️  High memory usage: ${Math.round(heapUsed)}MB`);
      global.gc && global.gc();
    }
  }
}

module.exports = PerformanceMonitor;