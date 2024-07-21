const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "restart",
  description: "Sunucu restartı kullan.",
  type: 1,
  options: [],
  
  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const channel = client.channels.cache.get('1079201498707279902'); // Genel Sohbet

    const restartEmbed = new EmbedBuilder()
      .setTitle("🟡 Sunucu Yeniden Başlatılıyor !")
      .setDescription("Sunucumuz yeniden başlatılıyor lütfen **AKTİF** verilmeden giriş yapayınız")
      .setImage("https://cdn.discordapp.com/attachments/1129782027445600316/1130211008527474820/Restart.gif")
      .setColor("#f5d400")

    const restartButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Sınırsız Davet')
        .setStyle(5)
        .setEmoji('🖇️')
        .setURL('https://discord.gg/allah2'),
    );

    channel.send({ content: '|| @everyone ||', embeds: [restartEmbed], components: [restartButton]});
    
    await interaction.reply({ content: 'Komutu yerine getirdim', ephemeral: true });
  },
};
