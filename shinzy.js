const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = 's!'

client.on("ready", async () => {
client.user.setActivity(`s!yardım`, { type: "PLAYING" });
  console.log("Naber Müdür");
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('#fa00ed')
    .setDescription(`
    
   ❎ **Proje Sistemimizde Zaten Bulunuyor ** 

    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('#fa00ed')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    **✅ Yazdığınız Proje Başarıyla Uptime Sistemimize Eklendi.**
    `)
    .addField('```s!linkler```','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//yDarKDayS
    .setTimestamp()
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('#fa00ed')
  .setDescription(`

  **❎ Hey Uptime Edeceğim URL Girmelisin! **

> s!ekle (Glitch Show Linki)
  `)
.setImage("https://cdn.discordapp.com/attachments/921809051459928094/921809385343316038/unknown.png")
  .setThumbnail(message.author.avatarURL)
  message.channel.send(dijitaluptime)
  })
  }

  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()
  .setColor('#fa00ed')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`
  
☀️ ** Şuanda  \`${db.get('Proje')}\` URL'yi 7/24 Aktif Tutuyor. **

☀️ **  Bu Linklerden Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Senin URl'ni Uptime ediyor!**
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'yardım') {
  const pxd = new Discord.MessageEmbed()
  .setColor('#fa00ed')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  
  .setDescription(`


`)
  .addField('** Shinzy Uptime **',`
- **s!ekle (glitch show linki)** = Botunuzu 7/24 Aktif Tutar.
- **s!linkler** = 7/24 Tuttuğum linklerini gösterir.
- **s!say** = Tüm Uptime edilmiş bot sayısını gösterir.
`)
  .addField('------------------------------------------------------',`
[Destek Sunucu](https://discord.gg/dUc7nAwnjv)
[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=921808164796633163&scope=bot&permissions=805314622)`)
  message.channel.send(pxd)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('#fa00ed').setDescription(`**Hiç link eklememişsin. Üzdün Beni Dostum Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('#fa00ed').setDescription(`- **7/24 Aktfi Tuttuğum botlarınızın linklerini daha güvenli olduğunda DM üzerinden gönderdim ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor('#fa00ed').setDescription(`- ** Uptime Ettigin Linklerin:** \n\n\``+Linkleri.join('\n')+`\`

 [Destek Sunucu](https://discord.gg/dUc7nAwnjv)`).setThumbnail(message.author.avatarURL))
    }


   
})




client.on('ready', () => {
client.user.setActivity(`s!ekle (Kısa Link)`, { type: 'PLAYING' })
client.user.setStatus('idle')
  

})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["818101912460722186"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}

client.on('message', message => {
  const codemarefireklamliste = ['.glitch.me/','.glitch.me']
  if(codemarefireklamliste.some(codemarefi => message.content.includes(codemarefi))){
    // Lin Atarsa Mesajı Silelim
    message.delete()

    // Uyaralım
    const keslan = new Discord.MessageEmbed()
    .setDescription(`- **Projeniz 3 4 dakika içinde eklenicektir :) ${message.author}**
Lütfen spam ATMAYINIZ`  )
    .setColor('#fa00ed')
    message.channel.send(keslan) .then(msg => msg.delete({ timeout: 9000}));
  }
})


client.login(process.env.token);//burda .env dosyasında atıyor ama eğer isterseniz process.env.token yerini silip
// "tokeniniz" şeklinde yapabilirsiniz




