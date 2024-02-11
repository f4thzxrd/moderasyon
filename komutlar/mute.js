const Discord = require('discord.js');
const ms = require('ms');

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has("1206296931035254846")) {
        const yetkiyok = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Bu kodu kullanmak için gerekli yetkiye sahip değilsin.**`)
            .setColor('#ff0000');
        return message.channel.send(yetkiyok);
    }

    let kullanıcı = message.mentions.members.first();
    let sure = args[1];
    let sebep = args.slice(2).join(' ');

    if (!kullanıcı || !sure || !sebep) {
        const cmfhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`**Lütfen Kullanıcı, Süre ve Sebep belirtin.**`);
        return message.channel.send(cmfhata);
    }

    // Mute log kanalı
    const muteLogKanalı = message.guild.channels.cache.get("1206295797818331176");
    if (!muteLogKanalı) {
        console.error("Mute log kanalı bulunamadı.");
        return;
    }

    // Mute atıldığında mesaj
    const muteLogEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Mute Log')
        .setDescription(`**${kullanıcı}** kişisine **${message.author}** tarafından **${sure.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')}** süreyle mute atıldı.`)
        .addField('Sebep', sebep)
        .setThumbnail(kullanıcı.user.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(`${kullanıcı.user.username}, ${sure} boyunca susturuldu.`);

    // Mute log kanalına mesajı gönder
    muteLogKanalı.send(muteLogEmbed);

    // Mute atılan kişiye rol verme
    const muteliRol = message.guild.roles.cache.find(role => role.name === "Muteli");
    if (!muteliRol) {
        console.error("Muteli rol bulunamadı.");
        return;
    }
    kullanıcı.roles.add(muteliRol);

    // Mute süresi bitince rolü geri alma
    setTimeout(() => {
        kullanıcı.roles.remove(muteliRol);
    }, ms(sure));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Mute', 'MUTE', 'sustur', 'Sustur', 'SUSTUR'],
    permLevel: 0
};

exports.help = {
    name: 'mute'
};
