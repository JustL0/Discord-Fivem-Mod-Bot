const { Client, EmbedBuilder, Permissions } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bir kullanıcıyı yasaklar.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Yasaklanacak kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "sebep",
      description: "Yasaklama sebebini belirtin.",
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
      return interaction.reply({ content: "Hatalı komut kullanımı! Yasaklanacak kullanıcıyı etiketleyin.", ephemeral: true });
    }

    try {
      await kullanici.ban({ reason: sebep });

      const logKanalId = "1130009343551610880";
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("Kullanıcı Yasaklandı")
          .setDescription(`**Yasaklanan Kullanıcı:** ${kullanici}\n**Yasaklayan Yetkili:** ${interaction.user}\n**Sebep:** ${sebep}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısı başarıyla yasaklandı!\n**Sebep:** ${sebep}`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Yasaklama işlemi sırasında bir hata oluştu!", ephemeral: true });
    }
  }
};
