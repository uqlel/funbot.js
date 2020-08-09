const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$ping') {
    msg.reply('pong');
  }
});

client.login('Njg2MTI4NzE3ODI2NzUyNTMy.XmStKQ.4rddqkgcWQmGz47qdKWW9CNsMwY');