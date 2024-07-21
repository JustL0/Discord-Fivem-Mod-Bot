const { Client, EmbedBuilder } = require("discord.js");

// Sabit olarak belirlediğiniz rol ID'si
const whitelistedRolID = "1023625273234690209";
const excludedRoleID = "1065259014218326127";

module.exports = {
  name: "wl-say",
  description: "Sunucudaki Whitelisted üyelerin durumlarını gösterir.",
  type: 1,

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const guild = interaction.guild;
    const whitelistedRol = guild.roles.cache.get(whitelistedRolID);
    if (!whitelistedRol) {
      return interaction.reply({ content: "Geçerli bir rol ID'si belirtilmemiş veya belirtilen rol bulunamadı. Lütfen bot dosyasındaki whitelistedRolID değişkenini düzgünce belirttiğinizden emin olun.", ephemeral: true });
    }

    const excludedRole = guild.roles.cache.get(excludedRoleID);
    if (!excludedRole) {
      return interaction.reply({ content: "Geçerli bir rol ID'si belirtilmemiş veya belirtilen rol bulunamadı. Lütfen bot dosyasındaki excludedRoleID değişkenini düzgünce belirttiğinizden emin olun.", ephemeral: true });
    }

    const whitelistedMembers = guild.members.cache.filter(member => member.roles.cache.has(whitelistedRolID) && !member.roles.cache.has(excludedRoleID));
    const activeMembers = whitelistedMembers.filter(member => member.presence?.status === "online" || member.presence?.status === "idle" || member.presence?.status === "dnd");

    // Embed oluşturun
    const embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Whitelisted Üye Sayısı ve Durumları")
      .addFields(
        {
          name: "⚪ Toplam Whitelisted Üye",
          value: "ㅤㅤ**" + whitelistedMembers.size.toString() + "**", 
        },
        {
          name: "🟢 Aktif Whitelisted Üye Sayısı",
          value: "ㅤㅤ**" + activeMembers.size.toString() + "**", 
          inline: false
        }
      )

    interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
