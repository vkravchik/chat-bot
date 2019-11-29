require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
});

// Test Ping - Pong
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

const ytdl = require('ytdl-core');

client.on('message', msg => {
  if (!msg.guild) return;

  if (msg.content.includes('!play')) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(connection => {
        msg.reply(`Hello!`);

        const link = msg.content.split(' ')[1];
        const dispatcher = connection.playStream(ytdl(link, {filter: 'audioonly'}));

        dispatcher.on('error', e => {
          console.log(e);
        });

        dispatcher.setVolume(0.7);
      }).catch(err => {
        console.log(err);
      })
    } else {
      msg.reply('Join to voice chanel, please');
    }
  }
});

client.login(process.env.BOT_SECRET_KEY);
