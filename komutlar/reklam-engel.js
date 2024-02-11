
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


// Yasaklı kelimelerin listesi
const bannedWords = ["discord.gg/", "https", "https://",".com",".gov"];

client.on('message', message => {
    // Sunucu mesajlarını kontrol et
    if (!message.guild) return;

    // Bot mesajlarını kontrol et
    if (message.author.bot) return;

    // Yetkililerin mesajlarını kontrol et (isteğe bağlı)
    if (message.member.hasPermission("ADMINISTRATOR")) return;

    // Mesaj içeriğini kontrol et
    const content = message.content.toLowerCase();
    for (const word of bannedWords) {
        if (content.includes(word.toLowerCase())) {
            message.delete(); // Mesajı sil
            message.reply('Reklam içeren mesajlar silindi.'); // Kullanıcıya bilgi ver
            return; // Döngüden çık
        }
    }
});

exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "reklamengel",
  description: '.',
  usage: 'reklamengel'
}