
const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
if(!args[0]) return message.channel.send(`**Lütfen Silinicek Mesaj Miktarını Yazın.!**`);
message.channel.bulkDelete(args[0]).then(() => {
client.channels.cache.get("1206295797818331176").send(
(new Discord.MessageEmbed()
.setColor("#F8C300") // embed mesajımınız rengi eğer RANDOM yazarsanız her kullanımda farklı renk atar
.setTitle("Temizle Komutu") // başlık kısmımız
.setDescription(`${message.channel} üzerinde **${args[0]}** mesaj sildim.`) // açıklama
.addField("Mesajları silen yetkili" , `${message.member}`) // Silen yetkiliyi gösterdiği kısım
.setFooter("Fathz was here!") // en alt kısım genellikle bot adını yazıyorum
.setTimestamp() // en sağ altta saati söyler eğer istemiyorsanız bu kod satırını silebilirsin.
));
})
}
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['sil','temizle','süpür'],
permLevel: 2,
};
exports.help = {
name:'temizle',
description: 'Belirlenen miktarda mesajı siler.',
usage: 'temizle <silinicek mesaj sayısı>'
};

