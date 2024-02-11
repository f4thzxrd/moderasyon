const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor('RED')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('**Fathz Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
      if(message.author.id !== "1152646035701772398") return message.channel.send("fathz değilsin orosbuuu cocugu")
    
    message.channel.send(`Bot yeniden başlatılıyor abe hayrann :`).then(msg => {
    console.log(`BOT: Yeniden Başlatılıyor.....`);
    process.exit(0);
  })
    
          
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r","reboot","yenile","yeniden başlat","R"],
permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'Botunuzu yeniden başlatır....',
  usage: 'reboot'
};