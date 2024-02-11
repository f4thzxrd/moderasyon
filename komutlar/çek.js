const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply("**Bu Komutu Kullanmaya Yetkin Yok!**");

  if (!message.member.voice.channel)
    return message.reply("**Bir Ses Kanalında Değilsin!**");
  let csm = message.mentions.members.first();
  if (!csm)
    return message.reply(
      "**Yanına Kimin Gelmesini İstiyor İsen Onu Etiketlemen Gerek!**"
    );
  if (!csm.voice.channel)
    return message.reply("**Etiketlenen Kişi Bir Sesli Kanalda Değil!**");

  csm.voice.setChannel(message.member.voice.channelID);
  message.channel.send("<@"+csm + "> **İsimli Kişi Yanına Taşındı!**");
};

exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "çek",
  description: 'Son silinen mesajı yakalar.',
  usage: 'çek'
}