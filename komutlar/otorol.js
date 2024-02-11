const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const { guild } = member;

    // Otorol verilecek rolün ID'si
    const roleId = "1204771049619853312"

    // Otorol verilecek rolün objesini al
    const role = guild.roles.cache.get(roleId);

    if (!role) {
        console.error('Otorol rolü bulunamadı!');
        return;
    }

    // Kullanıcıya otorolü ver
    member.roles.add(role)
        .then(() => {
            console.log(`Otorol verildi - Kullanıcı: ${member.user.tag}`);
            const channel = guild.channels.cache.get(1205972742273368135);
            if (channel) {
                channel.send(`Kullanıcıya ${role.name} rolü verildi - Sunucu sayımız şu an ${guild.memberCount}`);
            } else {
                console.error('Log kanalı bulunamadı!');
            }
        })
        .catch(console.error);
});

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["otorol"],
    permLevel: 0
  };
  
  module.exports.help = {
    name: 'otorol',
    description: 'Botta bulunan tüm komutları gösterir',
    usage: 'otorol'
  };
  