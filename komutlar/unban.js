// ban.js

const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.reply('Bu komut sadece sunucularda kullanılabilir.');

    // Kullanıcının yetkisini kontrol eder
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Bu komutu kullanma yetkiniz yok.');

    // Komut kullanımını kontrol et
    if (args.length < 1) return message.reply('Banını açmak istediğiniz kullanıcının ID\'sini belirtmelisiniz.');

    // !unban <kullanıcı_id>
    const userId = args[0];

    // Kullanıcının banını aç
    try {
        const bannedUser = await client.users.fetch(userId);
        if (bannedUser) {
            message.guild.members.unban(bannedUser);
            message.channel.send(`${bannedUser.tag} kullanıcısının banı açıldı.`);
        } else {
            message.reply('Belirtilen ID\'ye sahip bir kullanıcı bulunamadı.');
        }
    } catch (error) {
        console.error('Ban açılırken bir hata oluştu:', error);
        message.reply('Ban açılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [], // Eğer komutun alternatif isimleri varsa buraya ekleyin
  permLevel: 0 // Kullanıcı izin seviyesi (eğer gerekiyorsa)
};

exports.help = {
  name: "unban", // Komutun adı
  description: "Belirttiğiniz kullanıcının banını açar.", // Komutun açıklaması
  usage: "unban <kullanıcı_id>" // Komutun nasıl kullanılacağının açıklaması
};
