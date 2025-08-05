module.exports = {
  // Multi-Bot Configuration
  bots: [
    {
      name: "Music Bot 1",
      token: process.env.BOT1_TOKEN || 'YOUR_BOT1_TOKEN_HERE',
      clientId: process.env.BOT1_CLIENT_ID || 'YOUR_BOT1_CLIENT_ID_HERE',
      channelId: process.env.BOT1_CHANNEL_ID || 'YOUR_BOT1_CHANNEL_ID_HERE',
      prefix: process.env.BOT1_PREFIX || '!',
      language: 'ar' // Arabic
    },
    {
      name: "Music Bot 2", 
      token: process.env.BOT2_TOKEN || 'YOUR_BOT2_TOKEN_HERE',
      clientId: process.env.BOT2_CLIENT_ID || 'YOUR_BOT2_CLIENT_ID_HERE',
      channelId: process.env.BOT2_CHANNEL_ID || 'YOUR_BOT2_CHANNEL_ID_HERE',
      prefix: process.env.BOT2_PREFIX || '!',
      language: 'en' // English
    }
  ],
  
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_SPOTIFY_CLIENT_SECRET'
  },
  
  embed: {
    color: '#5865F2',
    footer: 'Music Bot | Professional Edition'
  },
  
  cooldowns: {
    play: 3000,
    skip: 1000,
    stop: 2000
  },
  
  maxQueueSize: 100,
  defaultVolume: 50,
  leaveTimeout: 300000,
  
  // Language Settings
  languages: {
    ar: {
      prefix: '!',
      messages: {
        notInVoiceChannel: '❌ يجب أن تكون في روم صوتي لاستخدام هذا الأمر!',
        noPermission: '❌ ليس لديك صلاحية لاستخدام هذا الأمر!',
        notInSameChannel: '❌ يجب أن تكون في نفس الروم الصوتي مع البوت!',
        nothingPlaying: '❌ لا يوجد شيء يعمل حالياً!',
        needSongName: '❌ يرجى تقديم اسم الأغنية أو الرابط!',
        songAdded: '✅ تم إضافة الأغنية إلى القائمة',
        songSkipped: '⏭️ تم تخطي الأغنية الحالية!',
        playbackStopped: '⏹️ تم إيقاف التشغيل ومسح القائمة!',
        playbackPaused: '⏸️ تم إيقاف الأغنية مؤقتاً!',
        playbackResumed: '▶️ تم استئناف الأغنية!',
        volumeChanged: '🔊 تم تغيير مستوى الصوت إلى:',
        loopModeChanged: '🔁 تم تغيير وضع التكرار إلى:',
        autoplayToggled: '🔄 تم تبديل وضع التشغيل التلقائي إلى:',
        queueCleared: '🗑️ تم مسح القائمة',
        queueShuffled: '🔀 تم خلط القائمة',
        nowPlaying: '🎵 الآن يعمل',
        queue: '📋 قائمة الأغاني',
        help: '📚 الأوامر المتاحة',
        error: '❌ حدث خطأ أثناء تنفيذ الأمر!',
        musicError: '❌ حدث خطأ أثناء تشغيل الموسيقى!'
      },
      commands: {
        play: { name: 'تشغيل', aliases: ['شغل'], description: 'تشغيل أغنية من يوتيوب أو سبوتيفاي أو ساوند كلاود', usage: '<اسم الأغنية أو الرابط>' },
        skip: { name: 'تخطي', aliases: ['تجاوز'], description: 'تخطي الأغنية الحالية' },
        stop: { name: 'إيقاف', aliases: ['توقف', 'غادر'], description: 'إيقاف التشغيل ومسح القائمة' },
        pause: { name: 'إيقاف مؤقت', aliases: ['استئناف'], description: 'إيقاف مؤقت أو استئناف الأغنية' },
        queue: { name: 'قائمة', aliases: ['ق'], description: 'عرض قائمة الأغاني الحالية' },
        volume: { name: 'صوت', aliases: ['ص'], description: 'تغيير مستوى الصوت', usage: '[0-100]' },
        nowplaying: { name: 'الآن', aliases: ['حالي'], description: 'عرض معلومات الأغنية الحالية' },
        loop: { name: 'تكرار', aliases: ['دورة'], description: 'تعيين وضع التكرار', usage: '[إيقاف/أغنية/قائمة]' },
        autoplay: { name: 'تشغيل تلقائي', aliases: ['تلقائي'], description: 'تبديل وضع التشغيل التلقائي' },
        clear: { name: 'مسح', aliases: ['حذف'], description: 'مسح قائمة الأغاني' },
        shuffle: { name: 'خلط', aliases: ['عشوائي'], description: 'خلط قائمة الأغاني' },
        help: { name: 'مساعدة', aliases: ['ح', 'أوامر'], description: 'عرض جميع الأوامر المتاحة' }
      }
    },
    en: {
      prefix: '!',
      messages: {
        notInVoiceChannel: '❌ You need to be in a voice channel to use this command!',
        noPermission: '❌ You do not have permission to use this command!',
        notInSameChannel: '❌ You need to be in the same voice channel as the bot!',
        nothingPlaying: '❌ There is nothing playing!',
        needSongName: '❌ Please provide a song name or URL!',
        songAdded: '✅ Song has been added to the queue',
        songSkipped: '⏭️ Skipped the current song!',
        playbackStopped: '⏹️ Stopped playing and cleared the queue!',
        playbackPaused: '⏸️ Paused the song!',
        playbackResumed: '▶️ Resumed the song!',
        volumeChanged: '🔊 Volume set to:',
        loopModeChanged: '🔁 Loop mode set to:',
        autoplayToggled: '🔄 Autoplay is now:',
        queueCleared: '🗑️ Queue cleared',
        queueShuffled: '🔀 Queue shuffled',
        nowPlaying: '🎵 Now Playing',
        queue: '📋 Music Queue',
        help: '📚 Available Commands',
        error: '❌ An error occurred while executing the command!',
        musicError: '❌ An error occurred while playing music!'
      },
      commands: {
        play: { name: 'play', aliases: ['p'], description: 'Play a song from YouTube, Spotify, or SoundCloud', usage: '<song name or URL>' },
        skip: { name: 'skip', aliases: ['s'], description: 'Skip the current song' },
        stop: { name: 'stop', aliases: ['leave', 'disconnect'], description: 'Stop playing and clear the queue' },
        pause: { name: 'pause', aliases: ['resume'], description: 'Pause or resume the current song' },
        queue: { name: 'queue', aliases: ['q'], description: 'Show the current music queue' },
        volume: { name: 'volume', aliases: ['vol'], description: 'Change the playback volume', usage: '[0-100]' },
        nowplaying: { name: 'nowplaying', aliases: ['np', 'current'], description: 'Show information about the currently playing song' },
        loop: { name: 'loop', aliases: ['repeat'], description: 'Set loop mode for the queue', usage: '[off/song/queue]' },
        autoplay: { name: 'autoplay', aliases: ['ap'], description: 'Toggle autoplay mode' },
        clear: { name: 'clear', aliases: ['cl'], description: 'Clear the music queue' },
        shuffle: { name: 'shuffle', aliases: ['random'], description: 'Shuffle the music queue' },
        help: { name: 'help', aliases: ['h', 'commands'], description: 'Show all available commands' }
      }
    }
  }
};