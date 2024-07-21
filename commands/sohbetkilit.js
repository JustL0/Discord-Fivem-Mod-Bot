const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "sohbet-kilit",
  description: "Sohbeti kilitler.",
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
        SendMessages: false
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
      .setTitle("🔒 Sohbet Yetkili Tarafından Kilitlenmiştir.")
      .setDescription("**Lütfen sohbet açılana kadar bekleyiniz.**")
      .setColor("#f50000");

    genelSohbet.send({ embeds: [lockedEmbed] });

    await interaction.reply({ content: 'Genel sohbet başarıyla kilitlendi.', ephemeral: true });
  }
};
