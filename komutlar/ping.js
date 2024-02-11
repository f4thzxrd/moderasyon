const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const ping = Date.now() - message.createdTimestamp;
    message.channel.send(`🏓 Pong! Bot pingi: ${ping}ms`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pong'],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Botun ping değerini gösterir.',
    usage: 'ping'
};
