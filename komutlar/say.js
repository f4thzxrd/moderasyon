const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.channel.send('Bu komutu kullanmak için gerekli izne sahip değilsiniz.');
    }

    const guild = message.guild;
    const members = guild.members.cache;
    const roles = guild.roles.cache;
    const botsRole = roles.find(role => role.name === '+bot');
    const specificRoleID = '1195685452364132484'; // Belirli rolün ID'sini buraya yazın
    const specificRole = roles.get(specificRoleID);
    const onlineMembers = members.filter(member => member.presence.status !== 'offline');
    const voiceChannelMembers = members.filter(member => member.voice.channel);

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Sunucu İstatistikleri')
        .addField('Toplam Üye Sayısı', guild.memberCount, true)
        .addField('Aktif Üye Sayısı', onlineMembers.size, true)
        .addField('Seste Olan Üye Sayısı', voiceChannelMembers.size, true);

    if (specificRole) {
        const specificRoleMembers = specificRole.members.size;
        embed.addField('Ekipteki üye sayımız', specificRoleMembers, true);
    }

    if (botsRole) {
        const botMembersWithRole = botsRole.members.size;
        embed.addField('Bot Üye Sayısı', botMembersWithRole, true);
    }

    const boostCount = guild.premiumSubscriptionCount || '0';
    embed.addField('Boost Sayısı', boostCount, true);

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['server-stats', 'stats'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Sunucudaki üyelerin istatistiklerini gösterir.',
    usage: 'say'
};
