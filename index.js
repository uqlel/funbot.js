const Discord = require('discord.js');
const http = require('http');
const axios = require('axios');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let ts = `${hours}:${minutes}:${seconds} ${month}/${date}/${year}`;

client.on('message', async message => { 
  
if (message.mentions.has(client.user)) {
  if (message.content.has("@here")) return;
  if (message.content.has("@everyone")) return;
  fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: @mention, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
    if (err) throw err;

})
  const embed = new Discord.MessageEmbed()
  .setTitle("Informacje o bocie")
  .addField("Prefix bota:", prefix)
  .addField("Dostępne komendy:", `${prefix}help`)
  .addField("Serwery:", client.guilds.cache.size)
  .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
  .setTimestamp()
  message.channel.send(embed)
}
});
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if(command === "gif"){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: GIF, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
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
        .setFooter("Komenda wywołana przez: " + message.author.tag + "| Powered by GIPHY", message.author.displayAvatarURL())
        message.channel.send(gifembed);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
  }
  else if(command === "help"){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: HELP, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
  const helpembed = new Discord.MessageEmbed()
    .setTitle("Lista komend:")
    .setDescription("**:laughing: Zabawne:** \n `$gif`, `$polishmeme` , `$meme` \n **:frame_photo: Obrazy:**\n`$supreme [tekst]`, `$captcha [tekst]`, `$pies`, `$kot`, `$borsuk` \n<:reddit:742766045340631070> Reddit: \n `$randompost [subreddit]`, `$dank`, `$pewdiepie`, `$eyebleach` \n **:tools: Moderacyjne:**\n `$ban [@użytkownik]`, `$kick [@użytkownik]` \n **:information_source: Informacyjne:**\n `$help`, `$ping`, `$invite`")
    .setColor("111")
    .setTimestamp()
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter("Twórca bota: ! uQlel#9256", "https://cdn.discordapp.com/avatars/601711693172572170/f46b3e942452467038764ca694cffa26.png?size=1024")
  message.channel.send(helpembed);
  }
  else if(command === "polishmeme"){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: POLISHMEME, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
  var url = 'https://ivall.pl/memy';

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
      .setImage(memresponse.url)
      .setTimestamp()
      .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
      message.channel.send(memembed);
  });
}).on('error', function(e){
    console.log("Got an error: ", e);
});
  }
  else if(command === "meme"){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: MEME, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
  var url = 'http://meme-api.herokuapp.com/gimme/memes';

http.get(url, function(res){
  var body = '';

  res.on('data', function(chunk){
      body += chunk;
  });

  res.on('end', function(){
      var memresponse = JSON.parse(body);
      if(message.channel.nsfw === false){
        if(memresponse.nsfw === true){
          const embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`MEM: ${memresponse.title}`)
          .setDescription ("NSFW: Potwierdź że masz 18 lat lub powyżej: " + memresponse.postLink)
          .setTimestamp()
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(embed);
          return;
        }
      }
        
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
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: PING, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
         var embed = new Discord.MessageEmbed()
        .setAuthor(`Obliczanie pingu...`)
        .setColor("111")
        message.channel.send(embed).then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var embed = new Discord.MessageEmbed()
            .setAuthor(`Pong! ping bota to: ${ping} ms`)
            .setColor("111")
            m.edit(embed)
        });
  }
  else if(command === `borsuk`){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: BORSUK, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    try{
      const res = await axios({
          url: 'https://multiapp.xyz/api/images/badgers',
          headers: {
              token: "2vnP2GtxT196QWgPSbQ1eB"
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
    const text = message.content.replace(prefix + "supreme ", "" ,)
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: SUPREME (TEXT: ${text}), Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    const link = "https://api.alexflipnote.dev/supreme?text=" + text.replace(/ /g , "+" )
    const embed = new Discord.MessageEmbed()
    .setTitle("Supreme")
    .setImage(link)
    .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
   message.channel.send(embed)
  }
  else if(command === `captcha`){
    const text = message.content.replace(prefix + "captcha " , "")
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: CAPTCHA (Text: ${text}), Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    const link = "https://api.alexflipnote.dev/captcha?text=" + text.replace(/ /g, "+" )
    const embed = new Discord.MessageEmbed()
    .setTitle("Captcha")
    .setImage(link)
    .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
   message.channel.send(embed)
  }
  else if(command === `kick`) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Kick")
      .setDescription(`✖ Nie posiadasz permisji do wyrzucania!`)
      .setColor("DARK_RED")
      .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed)
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: KICK (Member: ${user.tag} ID: ${user}), Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
        if (err) throw err;
    
    })
      if (member) {
        member
          .kick("Wyrzucono przez" + message.author.tag + " (ID: " + message.author + " )")
          .then(() => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Kick")
            .setDescription(`✔ Wyrzucono ${user.tag}!`)
            .setColor("GREEN")
            .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
            message.channel.send(embed);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            const embed = new Discord.MessageEmbed()
            .setTitle("Kick")
            .setDescription(`✖ Nie mogę wyrzucić ${user.tag}!`)
            .setColor("DARK_RED")
            .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
            message.channel.send(embed);
            // Log the error
            console.error(err);
          });
      } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("Kick")
        .setDescription(`✖ Nie ma tej osoby na tym serwerze!`)
        .setColor("DARK_RED")
        .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
        message.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed()
      .setTitle("Kick")
      .setDescription(`✖ Nie oznaczyłeś osoby do wyrzucenia!`)
      .setColor("DARK_RED")
      .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
      message.channel.send(embed);
    }
  }
  else if(command === `ban`) {
    const embed = new Discord.MessageEmbed()
    .setTitle("Ban")
    .setDescription(`✖ Nie posiadasz permisji do banowania!`)
    .setColor("DARK_RED")
    .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed)
    const user = message.mentions.users.first();
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: BAN (Member: ${user.tag} ID: ${user}), Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({reason: "Zbanowano przez" + message.author.tag + "(ID:" + message.author + ")"})
          .then(() => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .setDescription(`✔ Zbanowano ${user.tag}!`)
            .setColor("GREEN")
            .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
            message.channel.send(embed);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            const embed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .setDescription(`✖ Nie mogę zbanować ${user.tag}!`)
            .setColor("DARK_RED")
            .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
            message.channel.send(embed);
            // Log the error
            console.error(err);
          });
      } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("Ban")
        .setDescription(`✖ Nie ma tej osoby na tym serwerze!`)
        .setColor("DARK_RED")
        .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
        message.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setDescription(`✖ Nie oznaczyłeś osoby do zbanowania!`)
      .setColor("DARK_RED")
      .setFooter("Komenda wywołana przez: " + message.author.tag , message.author.displayAvatarURL())
      message.channel.send(embed);
    }
  }
  else if(command === `invite`){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: INVITE, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    const embed = new Discord.MessageEmbed()
    .setTitle("Linki")
    .addField(":link: Dodaj bota", " [Kliknij tutaj](https://discord.com/oauth2/authorize?client_id=686128717826752532&permissions=8&scope=bot) aby dodać bota na serwer")
    .addField(":link: Serwer support", " [Kliknij tutaj](https://discord.gg/8jxajwq) aby dołączyć!")
    .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  }
  else if(command === `randompost`){
    const subreddit = message.content.replace(prefix + "randompost ", "" ,)
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: RANDOMPOST (/r/${subreddit}/), Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
  if (subreddit = ""){
    const embed = new Discord.MessageEmbed()
    .setColor('DARK_RED')
    .setTitle(`Błąd`)
    .setDescription ("Nie oznaczono subreddita \n Poprawne użycie:\n `$randompost [subrediit]`")
    .setTimestamp()
    .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
    message.channel.send(embed);
  }
    var url = `http://meme-api.herokuapp.com/gimme/${subreddit}`;

    http.get(url, function(res){
      var body = '';
    
      res.on('data', function(chunk){
          body += chunk;
      });
    
      res.on('end', function(){
          var redditresponse = JSON.parse(body);

          if(redditresponse.nsfw === true){
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/r/${subreddit}/: ${redditresponse.title}`)
            .setDescription ("NSFW: Potwierdź że masz 18 lat lub powyżej: " + redditresponse.postLink)
            .setTimestamp()
            .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
            message.channel.send(embed);
            return;
          }
          const embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`/r/${subreddit}/: ${redditresponse.title}`)
          .setDescription ("Link: " + redditresponse.postLink)
          .setImage(redditresponse.url)
          .setTimestamp()
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(embed);
      });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
  }
  else if(command === `dank`){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: DANKMEME, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    var url = 'http://meme-api.herokuapp.com/gimme/dankmemes';

    http.get(url, function(res){
      var body = '';
    
      res.on('data', function(chunk){
          body += chunk;
      });
    
      res.on('end', function(){
          var memresponse = JSON.parse(body);
            if(memresponse.nsfw === true){
              const embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(`/r/dankmemes/: ${memresponse.title}`)
              .setDescription ("NSFW: Potwierdź że masz 18 lat lub powyżej: " + memresponse.postLink)
              .setTimestamp()
              .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
              message.channel.send(embed);
              return;
            }
          const memembed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('/r/dankmemes/: ' + memresponse.title)
          .setURL(memresponse.postLink)
          .setImage(memresponse.url)
          .setTimestamp()
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(memembed);
      });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
  }
  else if(command === `pewdiepie`){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: PEWDIEPIE, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    var url = 'http://meme-api.herokuapp.com/gimme/pewdiepiesubmissions';

    http.get(url, function(res){
      var body = '';
    
      res.on('data', function(chunk){
          body += chunk;
      });
    
      res.on('end', function(){
          var memresponse = JSON.parse(body);
            if(memresponse.nsfw === true){
              const embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(`/r/${subreddit}/: ${memresponse.title}`)
              .setDescription ("NSFW: Potwierdź że masz 18 lat lub powyżej: " + memresponse.postLink)
              .setTimestamp()
              .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
              message.channel.send(embed);
              return;
            }
          const memembed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('/r/pewdiepiesubmissions/: ' + memresponse.title)
          .setURL(memresponse.postLink)
          .setImage(memresponse.url)
          .setTimestamp()
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(memembed);
      });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
  }
  else if(command === `eyebleach`){
    fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: EYEBLEACH, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
      if (err) throw err;
  
  })
    var url = 'http://meme-api.herokuapp.com/gimme/eyebleach';

    http.get(url, function(res){
      var body = '';
    
      res.on('data', function(chunk){
          body += chunk;
      });
    
      res.on('end', function(){
          var memresponse = JSON.parse(body);
            if(memresponse.nsfw === true){
              const embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(`/r/eyebleach/: ${memresponse.title}`)
              .setDescription ("NSFW: Potwierdź że masz 18 lat lub powyżej: " + redditresponse.postLink)
              .setTimestamp()
              .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
              message.channel.send(embed);
              return;
            }
          const memembed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('/r/eyebleach/: ' + memresponse.title)
          .setURL(memresponse.postLink)
          .setImage(memresponse.url)
          .setTimestamp()
          .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(memembed);
      });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
 
 }
  else if(command === `kot`){
  fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: KOT, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
    if (err) throw err;

})
  var url = 'http://api.alexflipnote.dev/cats';

  http.get(url, function(res){
    var body = '';
  
    res.on('data', function(chunk){
        body += chunk;
    });
  
    res.on('end', function(){
        var memresponse = JSON.parse();
        const memembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Kot')
        .setImage(memresponse.file)
        .setTimestamp()
        .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
        message.channel.send(memembed);
    });
  }).on('error', function(e){
      console.log("Got an error: ", e);
  });
}
else if(command === `pies`){
  fs.appendFile('/home/julek/funbot-logs/command.log', `\n ${ts} Command: PIES, Author: ${message.author.tag}(ID: ${message.author}), Guild: ${message.guild.name} (ID: ${message.guild.id}), Channel: ${message.channel.id}, Message: ${message.id}`, (err) => {
    if (err) throw err;

})
  var url = 'http://api.alexflipnote.dev/dogs';

  http.get(url, function(res){
    var body = '';
  
    res.on('data', function(chunk){
        body += chunk;
    });
  
    res.on('end', function(){
        var memresponse = JSON.parse();
        const memembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Pies')
        .setImage(memresponse.file)
        .setTimestamp()
        .setFooter("Komenda wywołana przez: " + message.author.tag, message.author.displayAvatarURL())
        message.channel.send(memembed);
    });
  }).on('error', function(e){
      console.log("Got an error: ", e);
  });
}
// Nad tą linią komendy.
});
  

client.on('ready', () => {
    console.log(`Zalogowano jako: ${client.user.tag}!`);
    fs.appendFile('/home/julek/funbot-logs/boot.log', `\n ${ts} Bot został włączony!`, (err) => {
      if (err) throw err;
  
  })
    client.user.setActivity(`$help | Serwery: ${client.guilds.cache.size}`), {type: 'LISTENING'};
  });
  client.on("guildCreate", guild => {

  const Channels = guild.channels.cache.filter(channel => channel.type == "text");

  // Creating an invite.
  Channels.first().createInvite({
      maxUses: 0,
      maxAge: 0,
      unique: true
  }).then(invite => {
    console.log(`Dołączyłem do serwera: ${guild.name} (id: ${guild.id}). Ten serwer ma ${guild.memberCount} członków! Zaproszenie: https://discord.gg/${invite.code}`);
    client.user.setActivity(`@funbot.js | Serwery: ${client.guilds.cache.size}`), {type: 'LISTENING'};
    fs.appendFile('/home/julek/funbot-logs/server.log', `\n${ts}Dołączyłem do serwera: ${guild.name} (id: ${guild.id}). Ten serwer ma ${guild.memberCount} członków! Zaproszenie: https://discord.gg/${invite.code}`, (err) => {
      if (err) throw err;
  
  })
  })
  });

client.login(token);