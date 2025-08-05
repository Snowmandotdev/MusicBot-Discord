const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    const botConfig = client.botConfig;
    const language = config.languages[botConfig.language];
    const queue = client.distube.getQueue(interaction.guild.id);

    if (!queue) {
      return interaction.reply({ 
        content: language.messages.nothingPlaying, 
        ephemeral: true 
      });
    }

    // Check if user is in voice channel
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ 
        content: language.messages.notInVoiceChannel, 
        ephemeral: true 
      });
    }

    if (queue.voiceChannel.id !== voiceChannel.id) {
      return interaction.reply({ 
        content: language.messages.notInSameChannel, 
        ephemeral: true 
      });
    }

    try {
      // Handle select menu interactions
      if (interaction.isStringSelectMenu()) {
        switch (interaction.customId) {
          case 'loop_mode':
            const newMode = parseInt(interaction.values[0]);
            queue.setRepeatMode(newMode);
            
            const modeNames = botConfig.language === 'ar' 
              ? ['إيقاف', 'أغنية', 'قائمة']
              : ['Off', 'Song', 'Queue'];
            
            await interaction.reply({ 
              content: `${language.messages.loopModeChanged} **${modeNames[newMode]}**`, 
              ephemeral: true 
            });
            break;

          default:
            await interaction.reply({ 
              content: '❌ Unknown select menu interaction', 
              ephemeral: true 
            });
        }
        return;
      }

      // Handle button interactions
      switch (interaction.customId) {
        case 'volume_down':
          const newVolumeDown = Math.max(0, queue.volume - 10);
          queue.setVolume(newVolumeDown);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **${newVolumeDown}%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_up':
          const newVolumeUp = Math.min(100, queue.volume + 10);
          queue.setVolume(newVolumeUp);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **${newVolumeUp}%**`, 
            ephemeral: true 
          });
          break;

        case 'pause_resume':
          if (queue.paused) {
            queue.resume();
            await interaction.reply({ 
              content: language.messages.playbackResumed, 
              ephemeral: true 
            });
          } else {
            queue.pause();
            await interaction.reply({ 
              content: language.messages.playbackPaused, 
              ephemeral: true 
            });
          }
          break;

        case 'skip':
          await queue.skip();
          await interaction.reply({ 
            content: language.messages.songSkipped, 
            ephemeral: true 
          });
          break;

        case 'loop':
          const currentMode = queue.repeatMode;
          const newMode = currentMode === 0 ? 1 : currentMode === 1 ? 2 : 0;
          queue.setRepeatMode(newMode);
          
          const modeNames = botConfig.language === 'ar' 
            ? ['إيقاف', 'أغنية', 'قائمة']
            : ['Off', 'Song', 'Queue'];
          
          await interaction.reply({ 
            content: `${language.messages.loopModeChanged} **${modeNames[newMode]}**`, 
            ephemeral: true 
          });
          break;

        case 'volume_mute':
          queue.setVolume(0);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **0%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_max':
          queue.setVolume(100);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **100%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_25':
          queue.setVolume(25);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **25%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_50':
          queue.setVolume(50);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **50%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_75':
          queue.setVolume(75);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **75%**`, 
            ephemeral: true 
          });
          break;

        case 'volume_100':
          queue.setVolume(100);
          await interaction.reply({ 
            content: `${language.messages.volumeChanged} **100%**`, 
            ephemeral: true 
          });
          break;

        case 'previous':
          if (queue.previousSongs.length > 0) {
            queue.back();
            await interaction.reply({ 
              content: botConfig.language === 'ar' ? '⏮️ العودة للأغنية السابقة' : '⏮️ Back to previous song', 
              ephemeral: true 
            });
          } else {
            await interaction.reply({ 
              content: botConfig.language === 'ar' ? '❌ لا توجد أغنية سابقة' : '❌ No previous song', 
              ephemeral: true 
            });
          }
          break;

        case 'autoplay':
        case 'autoplay_toggle':
          const autoplay = queue.toggleAutoplay();
          await interaction.reply({ 
            content: `${language.messages.autoplayToggled} **${autoplay ? (botConfig.language === 'ar' ? 'مفعل' : 'Enabled') : (botConfig.language === 'ar' ? 'معطل' : 'Disabled')}**`, 
            ephemeral: true 
          });
          break;

        case 'autoplay_info':
          const infoEmbed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle(botConfig.language === 'ar' ? 'ℹ️ معلومات التشغيل التلقائي' : 'ℹ️ Autoplay Information')
            .setDescription(botConfig.language === 'ar' 
              ? 'التشغيل التلقائي يضيف أغاني مشابهة للأغنية الحالية تلقائياً عند انتهاء القائمة'
              : 'Autoplay automatically adds songs similar to the current song when the queue ends')
            .addFields(
              { 
                name: botConfig.language === 'ar' ? 'كيف يعمل' : 'How it works', 
                value: botConfig.language === 'ar' 
                  ? '• يحلل الأغنية الحالية\n• يبحث عن أغاني مشابهة\n• يضيفها للقائمة تلقائياً'
                  : '• Analyzes current song\n• Finds similar songs\n• Adds them automatically', 
                inline: false 
              },
              { 
                name: botConfig.language === 'ar' ? 'المصادر' : 'Sources', 
                value: botConfig.language === 'ar' 
                  ? '• YouTube\n• Spotify\n• SoundCloud'
                  : '• YouTube\n• Spotify\n• SoundCloud', 
                inline: true 
              }
            )
            .setFooter({ text: config.embed.footer });

          await interaction.reply({ 
            embeds: [infoEmbed], 
            ephemeral: true 
          });
          break;

        case 'shuffle':
          if (queue.songs.length > 2) {
            queue.shuffle();
            await interaction.reply({ 
              content: language.messages.queueShuffled, 
              ephemeral: true 
            });
          } else {
            await interaction.reply({ 
              content: botConfig.language === 'ar' ? '❌ تحتاج إلى أغانٍ على الأقل في القائمة للخلط!' : '❌ Need at least 2 songs in queue to shuffle!', 
              ephemeral: true 
            });
          }
          break;

        case 'clear':
          const queueLength = queue.songs.length - 1;
          queue.songs.splice(1);
          await interaction.reply({ 
            content: botConfig.language === 'ar' 
              ? `🗑️ تم حذف **${queueLength}** أغنية من القائمة`
              : `🗑️ Removed **${queueLength}** songs from the queue`, 
            ephemeral: true 
          });
          break;

        case 'queue':
        case 'queue_shuffle':
          if (queue.songs.length > 2) {
            queue.shuffle();
            await interaction.reply({ 
              content: language.messages.queueShuffled, 
              ephemeral: true 
            });
          } else {
            await interaction.reply({ 
              content: botConfig.language === 'ar' ? '❌ تحتاج إلى أغانٍ على الأقل في القائمة للخلط!' : '❌ Need at least 2 songs in queue to shuffle!', 
              ephemeral: true 
            });
          }
          break;

        case 'queue_clear':
          const queueLength = queue.songs.length - 1;
          queue.songs.splice(1);
          await interaction.reply({ 
            content: botConfig.language === 'ar' 
              ? `🗑️ تم حذف **${queueLength}** أغنية من القائمة`
              : `🗑️ Removed **${queueLength}** songs from the queue`, 
            ephemeral: true 
          });
          break;

        case 'queue_export':
          const exportText = queue.songs.map((song, index) => {
            return `${index}. ${song.name} - ${song.formattedDuration}`;
          }).join('\n');
          
          await interaction.reply({ 
            content: botConfig.language === 'ar' 
              ? '📤 تم تصدير القائمة بنجاح!'
              : '📤 Queue exported successfully!', 
            ephemeral: true 
          });
          break;

        case 'help_interactive':
          const interactiveEmbed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle(botConfig.language === 'ar' ? '🎮 الأوامر التفاعلية' : '🎮 Interactive Commands')
            .setDescription(botConfig.language === 'ar' 
              ? 'أوامر مع أزرار تفاعلية متقدمة'
              : 'Commands with advanced interactive buttons')
            .addFields(
              { 
                name: '`!play` / `!تشغيل`', 
                value: botConfig.language === 'ar' 
                  ? 'تشغيل مع أزرار تفاعلية'
                  : 'Play with interactive buttons', 
                inline: true 
              },
              { 
                name: '`!control` / `!تحكم`', 
                value: botConfig.language === 'ar' 
                  ? 'لوحة تحكم متقدمة'
                  : 'Advanced control panel', 
                inline: true 
              },
              { 
                name: '`!settings` / `!إعدادات`', 
                value: botConfig.language === 'ar' 
                  ? 'إعدادات البوت'
                  : 'Bot settings', 
                inline: true 
              },
              { 
                name: '`!stats` / `!إحصائيات`', 
                value: botConfig.language === 'ar' 
                  ? 'إحصائيات متقدمة'
                  : 'Advanced statistics', 
                inline: true 
              }
            )
            .setFooter({ text: config.embed.footer });

          await interaction.reply({ 
            embeds: [interactiveEmbed], 
            ephemeral: true 
          });
          break;

        case 'help_music':
          const musicEmbed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle(botConfig.language === 'ar' ? '🎵 أوامر الموسيقى' : '🎵 Music Commands')
            .setDescription(botConfig.language === 'ar' 
              ? 'أوامر التحكم في الموسيقى'
              : 'Music control commands')
            .addFields(
              { 
                name: '`!volume` / `!صوت`', 
                value: botConfig.language === 'ar' 
                  ? 'تحكم دقيق في الصوت'
                  : 'Fine volume control', 
                inline: true 
              },
              { 
                name: '`!loop` / `!تكرار`', 
                value: botConfig.language === 'ar' 
                  ? 'قائمة منسدلة للتكرار'
                  : 'Dropdown menu for loop', 
                inline: true 
              },
              { 
                name: '`!autoplay` / `!تشغيل تلقائي`', 
                value: botConfig.language === 'ar' 
                  ? 'أزرار تفاعلية'
                  : 'Interactive buttons', 
                inline: true 
              },
              { 
                name: '`!queue` / `!قائمة`', 
                value: botConfig.language === 'ar' 
                  ? 'قائمة مع أزرار التحكم'
                  : 'Queue with control buttons', 
                inline: true 
              }
            )
            .setFooter({ text: config.embed.footer });

          await interaction.reply({ 
            embeds: [musicEmbed], 
            ephemeral: true 
          });
          break;

        case 'help_control':
          const controlEmbed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle(botConfig.language === 'ar' ? '⚙️ أوامر التحكم' : '⚙️ Control Commands')
            .setDescription(botConfig.language === 'ar' 
              ? 'أوامر التحكم الأساسية'
              : 'Basic control commands')
            .addFields(
              { 
                name: '`!skip` / `!تخطي`', 
                value: botConfig.language === 'ar' 
                  ? 'تخطي الأغنية الحالية'
                  : 'Skip current song', 
                inline: true 
              },
              { 
                name: '`!stop` / `!إيقاف`', 
                value: botConfig.language === 'ar' 
                  ? 'إيقاف ومسح القائمة'
                  : 'Stop and clear queue', 
                inline: true 
              },
              { 
                name: '`!pause` / `!إيقاف مؤقت`', 
                value: botConfig.language === 'ar' 
                  ? 'إيقاف مؤقت أو استئناف'
                  : 'Pause or resume', 
                inline: true 
              },
              { 
                name: '`!clear` / `!مسح`', 
                value: botConfig.language === 'ar' 
                  ? 'مسح القائمة'
                  : 'Clear queue', 
                inline: true 
              },
              { 
                name: '`!shuffle` / `!خلط`', 
                value: botConfig.language === 'ar' 
                  ? 'خلط القائمة'
                  : 'Shuffle queue', 
                inline: true 
              }
            )
            .setFooter({ text: config.embed.footer });

          await interaction.reply({ 
            embeds: [controlEmbed], 
            ephemeral: true 
          });
          break;

        case 'help_support':
          const supportEmbed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle(botConfig.language === 'ar' ? '💬 الدعم والمساعدة' : '💬 Support & Help')
            .setDescription(botConfig.language === 'ar' 
              ? 'معلومات الدعم والمساعدة'
              : 'Support and help information')
            .addFields(
              { 
                name: botConfig.language === 'ar' ? '📖 الاستخدام' : '📖 Usage', 
                value: botConfig.language === 'ar' 
                  ? 'استخدم `!help [أمر]` للحصول على معلومات مفصلة'
                  : 'Use `!help [command]` for detailed information', 
                inline: false 
              },
              { 
                name: botConfig.language === 'ar' ? '🎮 الأزرار التفاعلية' : '🎮 Interactive Buttons', 
                value: botConfig.language === 'ar' 
                  ? 'جميع الأوامر تدعم الأزرار التفاعلية'
                  : 'All commands support interactive buttons', 
                inline: false 
              },
              { 
                name: botConfig.language === 'ar' ? '🌐 اللغات المدعومة' : '🌐 Supported Languages', 
                value: botConfig.language === 'ar' 
                  ? 'العربية والإنجليزية'
                  : 'Arabic and English', 
                inline: true 
              },
              { 
                name: botConfig.language === 'ar' ? '🎵 المنصات المدعومة' : '🎵 Supported Platforms', 
                value: 'YouTube, Spotify, SoundCloud', 
                inline: true 
              }
            )
            .setFooter({ text: config.embed.footer });

          await interaction.reply({ 
            embeds: [supportEmbed], 
            ephemeral: true 
          });
          break;

        default:
          if (interaction.customId.startsWith('queue_page_')) {
            const page = parseInt(interaction.customId.split('_')[2]);
            // Handle queue page navigation
            await interaction.reply({ 
              content: botConfig.language === 'ar' 
                ? `📋 انتقل إلى الصفحة ${page}`
                : `📋 Navigated to page ${page}`, 
              ephemeral: true 
            });
          } else {
            await interaction.reply({ 
              content: '❌ Unknown button interaction', 
              ephemeral: true 
            });
          }

        case 'stop':
          queue.stop();
          await interaction.reply({ 
            content: language.messages.playbackStopped, 
            ephemeral: true 
          });
          break;

        default:
          await interaction.reply({ 
            content: '❌ Unknown button interaction', 
            ephemeral: true 
          });
      }

      // Update the original message with new button states
      if (interaction.message && interaction.customId !== 'stop') {
        const embed = interaction.message.embeds[0];
        const newEmbed = EmbedBuilder.from(embed);
        
        // Update buttons based on current state
        const buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('volume_down')
              .setLabel('🔉 -10')
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('volume_up')
              .setLabel('🔊 +10')
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('pause_resume')
              .setLabel(queue.paused ? '▶️' : '⏸️')
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId('skip')
              .setLabel('⏭️')
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('loop')
              .setLabel(queue.repeatMode ? '🔁' : '🔂')
              .setStyle(queue.repeatMode ? ButtonStyle.Success : ButtonStyle.Secondary)
          );

        const stopButton = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('stop')
              .setLabel(botConfig.language === 'ar' ? '⏹️ إيقاف' : '⏹️ Stop')
              .setStyle(ButtonStyle.Danger)
          );

        await interaction.message.edit({ 
          embeds: [newEmbed], 
          components: [buttons, stopButton] 
        });
      }

    } catch (error) {
      console.error('Button interaction error:', error);
      await interaction.reply({ 
        content: language.messages.error, 
        ephemeral: true 
      });
    }
  });
};