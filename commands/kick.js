const { Client, EmbedBuilder, Permissions } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Bir kullanıcıyı sunucudan atar.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Atılacak kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "sebep",
      description: "Atma sebebini belirtin.",
      type: 3,
      required: false 
    }
  ],

  run: async (client, interaction) => {
    const requiredPermission = "1077529201894240296"; 
    if (!interaction.member.permissions.has(requiredPermission)) {
      return interaction.reply({ content: "Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.", ephemeral: true });
    }

    const kullanici = interaction.options.getMember("kullanici");
    const sebep = interaction.options.getString("sebep") || "Belirtilmedi"; 

    if (!kullanici) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Atılacak kullanıcıyı etiketleyin.", ephemeral: true });
    }

    try {
      await kullanici.kick(sebep);

      const logKanalId = "1130009343551610880";
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#FFA500")
          .setTitle("Kullanıcı Sunucudan Atıldı")
          .setDescription(`**Atılan Kullanıcı:** ${kullanici}\n**Atan Yetkili:** ${interaction.user}\n**Sebep:** ${sebep}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısı başarıyla sunucudan atıldı!\n**Sebep:** ${sebep}`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Kick işlemi sırasında bir hata oluştu!", ephemeral: true });
    }
  }
};
