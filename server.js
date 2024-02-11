const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const { config } = require('process');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "aktif ediliyor...");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login("MTIwNjMwNjA1ODg3MjgyMzg1OA.GqgCok.xyAXxDYCHdrkcvrDMAijBKyrqOLCul6n0PpdtQ");
 



client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`otoRK_${member.guild.id}`);
    let rol = await db.fetch(`otoRL_${member.guild.id}`);
    let mesaj = db.fetch(`otoRM_${member.guild.id}`);
    if (!rol) return;
  
    if (!mesaj) {
      client.channels.cache
        .get(kanal)
        .send(
          ":loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber `" +
            member.guild.memberCount +
            "` Kişiyiz! Hoşgeldin! `" +
            member.user.username +
            "`"
        );
      return member.roles.add(rol);
    }
  
    if (mesaj) {
      var mesajs = mesaj
        .replace("-uye-", `${member.user}`)
        .replace("-uyetag-", `${member.user.tag}`)
        .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
        .replace("-server-", `${member.guild.name}`)
        .replace("-uyesayisi-", `${member.guild.memberCount}`)
        .replace(
          "-botsayisi-",
          `${member.guild.members.cache.filter(m => m.user.bot).size}`
        )
        .replace("-bolge-", `${member.guild.region}`)
        .replace("-kanalsayisi-", `${member.guild.channels.size}`);
      member.roles.add(rol);
      return client.channels.cache.get(kanal).send(mesajs);
    }
  });
  






  client.on('messageDelete', async message => {
    if(message.author.bot || !message.content) return;
    require('quick.db').push(message.guild.id, {
      author: message.author,
      authorTAG: message.author.tag,
      authorID: message.author.id,
      authorUSERNAME: message.author.username,
      authorDISCRIMINATOR: message.author.discriminator,
      messageID: message.id,
      messageCHANNEL: message.channel,
      messageCHANNELID: message.channel.id,
      messageCONTENT: message.content,
      messageCREATEDAT: message.createdAt
    });
  });// 



  client.on("message" , async msg => {
  
    if(!msg.guild) return; 
    let afk = msg.mentions.users.first()
    
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
    
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
  
         msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)
     }
   }
    if(msg.author.id === kisi){
  
         msg.reply(`Afk'lıktan Çıktınız`)
     db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
      msg.member.setNickname(isim)
      
    }
    
  });







  client.on("guildBanRemove", (guild, user) => {
    const database = require('quick.db')
    const bans = database.get(`acilmayanBan.laura.${guild.id}`) || [];
    if (bans.some(ban => ban.user.id == user.id)) return guild.members.ban(user, { reason: 'Açılmayan Ban Sistemi, fathz' });
});




client.on("message", async msg => {

    let saas = await db.fetch(`saas_${msg.guild.id}`);
  
    if (saas == 'kapali') return;
  
    if (saas == 'acik') {
  
    if (msg.content.toLowerCase() === 'sa') {
  
      msg.reply('ve aleykum selam kardeeeeş');
  
    }
  
    }
  
  });





  client.on('ready', () => {
    console.log(`Oto mesaj aktif !`);
    setInterval(function() {
       let kanal = client.channels.cache.get("1206278693207412747");
       if (kanal) {
           kanal.send("Selamlar. Arkadaşlar Sunucumuzda Caps Açmak, Spam Yapmak, Flood Yapmak, Dini Değerlere Sövmek, Bayan Üyeleri Kışkırtmak İllegal Muhabbet, Reklam, Yasaktır. !     Keyifli Muhabbetler Dileriz. Ekibe Gelmek İsteyenler URL Alıp Yetkililere Söyleyebilir. ");
       }
    }, 1800000); // Yarım saat (30 dakika) aralıkla mesaj gönder
  });
  