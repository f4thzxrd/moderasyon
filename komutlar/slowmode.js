const Discord = require('discord.js');

exports.run = async(client, message, args) => { 
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xFF0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); 
  }

  if (!message.member.hasPermission('MANAGE_CHANNELS')) {
    return message.channel.send("Bu komutu kullanmak için gerekli izne sahip değilsiniz.");
  }
  
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.MessageEmbed()
      .setDescription(`✅ Doğru Kullanım: \`slow-mode <sure>\``)
      .setColor('RANDOM')
      .setTimestamp()
    message.channel.send({embed})
    return
  }

  if (limit > 21600) {
    return message.channel.send(new Discord.MessageEmbed().setDescription("⏰ Süre Limiti Maksimum **21.600** Saniye Olabilir!").setColor('RANDOM'));
  } 
  
  message.channel.send(new Discord.MessageEmbed().setDescription(`✅ Yavaş Mod **${limit}** Saniye Olarak Ayarlandı!`).setColor('RANDOM'));
  var request = require('request');
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    }, 
    headers: {
      "Authorization": `Bot ${client.token}`
    },
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 2,
};

exports.help = {
  name: 'slow-mode',
  description: 'Sohbete yazma sınır (süre) ekler.', 
  usage: 'slow-mode [1/10]',
};
