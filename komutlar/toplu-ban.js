const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args) => {
    let user = [];
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**BAN_MEMBERS** Yetkin Yok!")
  if(!args) return message.channel.send("Birilerini Etiketle!");
  if(args){
    args.slice(0).map(r =>{
      if(r.startsWith("<@")) return;
      user.push(r);
    });
  }
  if(message.mentions.users){
    message.mentions.users.map(r =>{
      user.push(r.id);
    });
  }
  
  user.map(async(u)=>{
    await client.users.fetch(u).then(async e => {
      if(!e) return console.log(`${u}'IDli Biri Yok!`);
      message.guild.members.ban(e.id).catch(err => console.log(err));
    })
  });
  message.channel.send("Banladım!");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [], // Eğer komutun alternatif isimleri varsa buraya ekleyin
    permLevel: 0 // Kullanıcı izin seviyesi (eğer gerekiyorsa)
  };
  
  exports.help = {
    name: "topluban", // Komutun adı
    description: "Belirttiğiniz kullanıcının banını açar.", // Komutun açıklaması
    usage: "topluban" // Komutun nasıl kullanılacağının açıklaması
  };
  