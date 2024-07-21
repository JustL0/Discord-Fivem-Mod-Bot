const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

const whitelistedRolID = "1023625273234690209";
const unWhitelistedRolID = "1023625276439146516";

module.exports = {
  name: "wl-al",
  description: "Bir kullanıcıdan belirli bir rolü alır.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Rolün alınacağı kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici");


    try {
      const unWhitelistedRol = interaction.guild.roles.cache.get(unWhitelistedRolID);
      if (!unWhitelistedRol) {
        return interaction.reply({ content: "Geçerli bir rol ID'si belirtilmemiş veya belirtilen rol bulunamadı. Lütfen bot dosyasındaki unWhitelistedRolID değişkenini düzgünce belirttiğinizden emin olun.", ephemeral: true });
      }

      await kullanici.roles.add(unWhitelistedRol);


      const whitelistedRol = interaction.guild.roles.cache.get(whitelistedRolID);
      if (!whitelistedRol) {
        return interaction.reply({ content: "Geçerli bir rol ID'si belirtilmemiş veya belirtilen rol bulunamadı. Lütfen bot dosyasındaki whitelistedRolID değişkenini düzgünce belirttiğinizden emin olun.", ephemeral: true });
      }

      await kullanici.roles.remove(whitelistedRol);


      const logKanalId = "1129987816986775632";
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("WL Alındı")
          .setDescription(`**WL Alan:** ${interaction.user}\n**Kullanıcı:** ${kullanici}\n**Alınan Rol:** ${whitelistedRol}\n**Verilen Rol:** ${unWhitelistedRol}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısının kaydı başarıyla silindi.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Rol alırken bir hata oluştu!", ephemeral: true });
    }
  }
};
