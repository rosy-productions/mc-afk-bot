const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', 
  port: 62549,             
  username: 'AFK_Bot',     
  version: '1.20.1'        
});

// 1. SAFE LOGIN LOGIC
bot.on('spawn', () => {
  console.log('Bot spawned! Waiting 5 seconds before moving...');
  
  // Send AuthMe commands
  setTimeout(() => {
    bot.chat('/register MyPassword123 MyPassword123');
    bot.chat('/login MyPassword123');
    console.log('Login commands sent!');
    
    // Start anti-AFK only AFTER login and a small delay
    startAntiAFK();
  }, 5000);
});

// 2. SAFE ANTI-AFK (No glitchy packets)
function startAntiAFK() {
  setInterval(() => {
    // Instead of jumping (which causes packet errors), 
    // just look around randomly
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI;
    bot.look(yaw, pitch, false);
    console.log('Bot looked around to stay active');
  }, 30000); // Every 30 seconds
}

bot.on('error', (err) => console.log('Error:', err));
bot.on('kicked', (reason) => console.log('Kicked for:', reason));
bot.on('end', () => console.log('Bot disconnected.'));
