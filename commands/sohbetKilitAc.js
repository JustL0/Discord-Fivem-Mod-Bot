const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "sohbet-ac",
  description: "Sohbet kilidini açar.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")
    
    const genelSohbet = client.channels.cache.get('1079201498707279902'); // Genel sohbet 

    genelSohbet.permissionOverwrites.edit(interaction.guild.roles.cache.find(r => r.name === "Whitelisted"), {
        CreateInstantInvite: true,
        ReadMessageHistory: true,
        AttachFiles: false,
        AddReactions: true,
        Connect: true,
        ViewChannel: true,
        SendMessages: true
      });

    genelSohbet.permissionOverwrites.edit(interaction.guild.roles.cache.find(r => r.name === "| Staff Team"), {
        CreateInstantInvite: true,
        ReadMessageHistory: true,
        AttachFiles: true,
        AddReactions: true,
        Connect: true,
        ViewChannel: true,
        SendMessages: true
    });

    const lockedEmbed = new EmbedBuilder()
      .setTitle("🔓 Sohbetin Kilidi Yetkililer Tarafından Kaldırılmıştır.")
      .setDescription("**Sabrınız için teşekkürler.**")
      .setColor("#00f55e");

    genelSohbet.send({ embeds: [lockedEmbed] });

    await interaction.reply({ content: 'Genel sohbetin kilidi başarıyla açıldı.', ephemeral: true });
    
  }
};

