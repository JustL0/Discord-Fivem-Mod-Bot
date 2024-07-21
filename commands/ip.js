const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ip",
  description: "Sunucunun ip adresini verir.",
  type: 1,
  options: [],
  
  run: async(client, interaction) => {
    await interaction.reply('Sunucuya bağlanmak için F8 kısmınsa **connect 213.238.177.208** yazmanız yeterlidir.');
  }
};