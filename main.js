const Discord = require('discord.js');
const http = require('http');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  
	if (command === 'ping') {
		message.channel.send('Pong.');
	} 
	else if (command === "gif"){
    var url = 'http://api.giphy.com/v1/gifs/random?api_key=yPU9btxDmzgEk8ZXhmO3gaOcROfROZH0&tag=meme';

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var giphyresponse = JSON.parse(body);
        const gifembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('GIF')
        .setImage(giphyresponse.data.image_url)
        .setTimestamp()
        .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
        message.channel.send(gifembed);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
  }
  else if (command === "help"){
  const helpembed = new Discord.MessageEmbed()
    .setTitle("Lista komend:")
    .setDescription("**:laughing: Zabawne:** \n `$gif`,`$meme`\n **:frame_photo: Obrazy:**\n`$supreme [tekst]`, `$captcha [tekst]` \n **:information_source: Informacyjne:**\n `$help`, `$ping` ")
    .setColor("111")
    .setTimestamp()
    .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
  message.channel.send(helpembed);
}
});

client.on('ready', () => {
    console.log(`Zalogowano jako: ${client.user.tag}!`);
  });

client.login(token);