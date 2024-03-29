const { MessageEmbed } = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.channel.send('Bu komutu kullanmak için gerekli izne sahip değilsiniz.');
    }

    const emirhan = await data.fetch(`snipe.id.${message.guild.id}`);
    if (!emirhan) {
        const embeds = new MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setDescription(`Mesaj bulunamadı!`)
            .setColor(`#f3c7e1`)
            .setTimestamp();
        message.channel.send(embeds);
    } else {
        let kullanıcı = client.users.cache.get(emirhan);
        const silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`);
        const embed = new MessageEmbed()
            .setAuthor(kullanıcı.username, kullanıcı.avatarURL())
            .setDescription(`Silinen mesaj: ${silinen}`)
            .setColor(`#f3c7e1`)
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp();
        message.channel.send(embed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: "snipe",
    description: 'Son silinen mesajı yakalar.',
    usage: 'snipe'
};
