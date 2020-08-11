const Discord = require('discord.js');
const http = require('http');
const axios = require('axios');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if (command === "gif"){
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
    .setDescription("**:laughing: Zabawne:** \n `$gif`, `$polishmeme` , `$meme` \n **:frame_photo: Obrazy:**\n`$supreme [tekst]`, `$captcha [tekst]`, `$borsuk` \n **:information_source: Informacyjne:**\n `$help`, `$ping` ")
    .setColor("111")
    .setTimestamp()
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter("Twórca bota: ! uQlel#9256", "https://cdn.discordapp.com/avatars/601711693172572170/f46b3e942452467038764ca694cffa26.png?size=1024")
  message.channel.send(helpembed);
}
  else if (command === "polishmeme"){
  var url = 'http://meme-api.herokuapp.com/gimme/polish_memes';

http.get(url, function(res){
  var body = '';

  res.on('data', function(chunk){
      body += chunk;
  });

  res.on('end', function(){
      var memresponse = JSON.parse(body);
      const memembed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('POLSKI MEM: ' + memresponse.title)
      .setDescription ("Link: " + memresponse.postLink)
      .setImage(memresponse.url)
      .setTimestamp()
      .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
      message.channel.send(memembed);
  });
}).on('error', function(e){
    console.log("Got an error: ", e);
});
}
  else if (command === "meme"){
  var url = 'http://meme-api.herokuapp.com/gimme/memes';

http.get(url, function(res){
  var body = '';

  res.on('data', function(chunk){
      body += chunk;
  });

  res.on('end', function(){
      var memresponse = JSON.parse(body);
      const memembed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('MEM: ' + memresponse.title)
      .setDescription ("Link: " + memresponse.postLink)
      .setImage(memresponse.url)
      .setTimestamp()
      .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
      message.channel.send(memembed);
  });
}).on('error', function(e){
    console.log("Got an error: ", e);
});
}
  else if(command === `ping`) {
         var embed = new Discord.MessageEmbed()
        .setAuthor(`Obliczanie pingu...`)
        .setColor("111")
        message.channel.send(embed).then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var embed = new Discord.MessageEmbed()
            .setAuthor(`Pong! Twój ping to: ${ping} ms`)
            .setColor("111")
            
            
            m.edit(embed)
        });
    }
  else if(command === `borsuk`){
    try{
      const res = await axios({
          url: 'https://multiapp.xyz/api/images/badgers',
          headers: {
              token: "Sddv5AW1DoyS47QcFzKSQF"
          }
      })
      const embed = new Discord.MessageEmbed()
          .setTitle('Borsuk')
          .setImage(res.data.url)
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          .setTimestamp()
      message.channel.send(embed)
  }catch(err){
      message.channel.send(`Błąd w wysyłaniu. Zgłoś się do **! uQlel#9256**. Treść błędu: ${err.message}`)
  }
}
  else if(command === `supreme`){
    const text = message.content.replace(prefix + "supreme " , "")
    const link = "https://api.alexflipnote.dev/supreme?text=" + text.replace(" " , "+" )
    const embed = new Discord.MessageEmbed()
    .setTitle("Supreme")
    .setImage(link)
    .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
   message.channel.send(embed)
  }
  else if(command === `captcha`){
    const text = message.content.replace(prefix + "captcha " , "")
    const link = "https://api.alexflipnote.dev/captcha?text=" + text.replace(" " , "+" )
    const embed = new Discord.MessageEmbed()
    .setTitle("Captcha")
    .setImage(link)
    .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
   message.channel.send(embed)
  }
});

client.on('ready', () => {
    console.log(`Zalogowano jako: ${client.user.tag}!`);
    client.user.setActivity('$help', {type: 'LISTENING'})
  });

client.login(token);