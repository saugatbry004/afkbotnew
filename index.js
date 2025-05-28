const mineflayer = require('mineflayer');
const express = require('express');

// Web server to keep alive (for Replit, Glitch, etc.)
const app = express();
app.get('/', (req, res) => res.send('AFK_Bot is running!'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));

const bot = mineflayer.createBot({
  host: 'AGEN2.aternos.me',
  port: 58248,
  username: 'AFK_Bot',
});

bot.on('spawn', () => {
  console.log('✅ Bot has spawned on the server');

  // Anti-AFK action every 5 seconds
  setInterval(() => {
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * 0.5;

    bot.look(yaw, pitch, true);
    bot.setControlState('forward', true);
    bot.setControlState('jump', true);

    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.setControlState('jump', false);
    }, 1000);
  }, 5000); // every 5 seconds
});

bot.on('error', err => console.log('❌ Bot error:', err));
bot.on('end', () => console.log('❗ Bot disconnected.'));
