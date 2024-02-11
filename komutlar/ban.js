const discord = require("discord.js");
exports.run = (client, message, args) => {



    
  var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = message.guild.fetchBans();
   var kisi = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]); 
     var sebeb = args.slice(1).join(" ");
    
    
     if (!message.member.hasPermission("BAN_MEMBERS")) {
        const yetkinyok = new discord.MessageEmbed()
          .setDescription("**❌ Herhangi Bir Kişi Banlamak İçin `Üyeleri Engelle` İznine Sahip Olmalısın!**")
          .setColor("RED")
          return message.channel.send(yetkinyok)
     }


       
      if(!kisi) {
    const embedbruh = new discord.MessageEmbed()
    .setDescription("**❌ Belirttiğiniz Kişi Sunucuda Yok Veya Banlamak İçin Herhangi Bir Kişi Belirtmedin!**")
    .setColor("RED")
    return message.channel.send(embedbruh)
            
  }
      
    if(!message.author.id !== message.guild.ownerID) {  
  if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) <= 1) {
    const rolsira = new discord.MessageEmbed()
    .setDescription("**❌ Bu Kişi Rol Sıralamasında Senden Yüksekte Veya Eşit Bu Sebeple Onu Banlayamazsın!**")
    .setColor("RED")
    return message.channel.send(rolsira) 
     }
    }


     if(kisi.id == message.guild.ownerID) {
        const arkadaşownermış = new discord.MessageEmbed()
   .setDescription("**❌ Bu Kişi Sunucu Sahibi Onu Banlayamazsın!**")
   .setColor("RED")
   return message.channel.send(arkadaşownermış) 
      }
                    
          if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
       const yetkimyok = new discord.MessageEmbed()
       .setDescription("**❌ Herhangi Bir Kişi Banlamak İçin `Üyeleri Engelle` İznine Sahip Olmalıyım!**")
       .setColor("RED")
       return message.channel.send(yetkimyok)
     }
          
      
          if(!kisi.bannable) {
      const notbannable = new discord.MessageEmbed()
 .setDescription("**❌ Bu Kişiyi Banlayamam!**")
 .setColor("RED")
 return message.channel.send(notbannable)
    }

          
          
         var now = new Date()
 var sebepp = null
 
 if(!sebeb) {
   sebepp = "Sebep Belirtilmemiş."
 }    
 if(sebeb) {
   sebepp = sebeb
 }   
         try {
           const sucembeddm = new discord.MessageEmbed()
           .setDescription(`${kisi} **${guild}** Adlı Sunucudan Banlandın.` + "\r\n" + `**Sebep: ${sebepp}**`)
           .setColor("RED")
          kisi.send(sucembeddm)
           const sucembed = new discord.MessageEmbed()
           .setDescription(`✅ ${kisi} **Adlı Kullanıcı ${sebepp} Sebebi İle Banlandı.**`)
           .setColor("GREEN")
          message.channel.send(sucembed)
          return guild.members.ban(kisi, { reason: sebepp });
        } catch (error) {
          message.reply("**Bir Hata İle Karşılaşıldı Birkaç Dakika İçinde Tekrar Deneyin Eğer Bu Sorununuza Çözüm Olmadıysa Bir Geliştirici Veya Yetkiliye Bildirin!**")
          console.log(error)
        }  
          
          
          




}
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban"],
  permLevel: 0
};
exports.help = {
  name: "ban",
  description: "Belirttiğiniz Kişiyi Sunucudan Banlar",
  usage: "ban <Etiket> <Sebep Varsa Sebep>"
};