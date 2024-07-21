const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "kapalı",
  description: "Sunucu kapalıyken kullan.",
  type: 1,
  options: [],
  
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const channel = client.channels.cache.get('1079201498707279902'); // Genel Sohbet

    const bakimEmbed = new EmbedBuilder()
      .setTitle("🔴 Sunucu Kapalı !")
      .setDescription("Sunucumuz kapalıdır lütfen **AKTİF** verilmeden sunucuya giriş sağlamayınız.\n\nSabrınız için teşekkürler.")
      .setImage("https://cdn.discordapp.com/attachments/1129782027445600316/1129946573984505957/Bakm.gif")
      .setColor("#f50000")

    const buttonBakim = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Sınırsız Davet')
        .setStyle(5)
        .setEmoji('🖇️')
        .setURL('https://discord.gg/allah2'),
    );

    channel.send({ content: '|| @everyone ||', embeds: [bakimEmbed], components: [buttonBakim]});
    
    await interaction.reply({ content: 'Komutu yerine getirdim', ephemeral: true });
  },
};
