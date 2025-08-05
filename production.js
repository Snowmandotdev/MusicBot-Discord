require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const PerformanceMonitor = require('./utils/performance');
const ConfigValidator = require('./utils/validator');

if (cluster.isMaster) {
  console.log('🎵 Professional Multi-Language Discord Music Bot - Production Mode');
  console.log('================================================================');
  
  // Validate configuration
  if (!ConfigValidator.printValidationReport()) {
    console.log('❌ Configuration validation failed. Exiting...');
    process.exit(1);
  }
  
  // Initialize performance monitor
  const performanceMonitor = new PerformanceMonitor();
  
  // Start performance monitoring
  setInterval(() => {
    performanceMonitor.logPerformance();
    performanceMonitor.checkMemoryUsage();
  }, 300000); // Every 5 minutes
  
  // Start worker process
  cluster.fork();
  
  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`⚠️  Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down production system...');
    cluster.disconnect(() => {
      console.log('✅ All workers stopped gracefully');
      process.exit(0);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down production system...');
    cluster.disconnect(() => {
      console.log('✅ All workers stopped gracefully');
      process.exit(0);
    });
  });
  
} else {
  // Worker process
  require('./index');
  
  console.log(`🚀 Worker ${process.pid} started`);
  
  // Handle worker errors
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
}