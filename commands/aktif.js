const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "aktif",
  description: "Sunucu aktif vermek için kullan.",
  type: 1,
  options: [],
  
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const channel = client.channels.cache.get('1079201498707279902'); // Genel Sohbet

    const aktifEmbed = new EmbedBuilder()
      .setTitle("🟢 Sunucu Aktif !")
      .setDescription("**Sunucu aktif aşağıdaki butona tıklayarak Fivem'e giriş yapabilirsiniz.**\n\n**Arkadaşlarını sunucumuza davet etmek için aşağıdaki butona tıklayabilirsiniz.**")
      .setImage("https://cdn.discordapp.com/attachments/1129782027445600316/1129943006435360778/Aktif.gif")
      .setColor("#00f55e")

    const aktifButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Hızlı bağlan')
        .setStyle(5)
        .setEmoji('🚀')
        .setURL('https://discord.gg/allah'),
      new ButtonBuilder()
        .setLabel('Sınırsız Davet')
        .setStyle(5)
        .setEmoji('🖇️')
        .setURL('https://discord.gg/allah2'),
    );

    channel.send({ content: '|| @everyone ||', embeds: [aktifEmbed], components: [aktifButton]});
    
    await interaction.reply({ content: 'Komutu yerine getirdim', ephemeral: true });
  },
};
