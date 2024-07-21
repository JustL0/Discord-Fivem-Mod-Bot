const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "uyarı-al",
  description: "Bir kişiden uyarı almanı sağlar.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Rolün alınacağı kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "uyarı",
      description: "Alınacak uyarıyı seçin.",
      type: 8,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici");
    const rol = interaction.options.getRole("uyarı");


    if (!kullanici || !rol) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Kullanıcı ve uyarı seçeneklerini eksiksiz belirtmelisiniz.", ephemeral: true });
    }

  
    if (!kullanici.roles.cache.has(rol.id)) {
      return interaction.reply({ content: `${kullanici} kullanıcısının ${uyarı} uyarısı zaten bulunmamaktadır!`, ephemeral: true });
    }


    try {
      await kullanici.roles.remove(rol);


      const logKanalId = "1130002477060718625"; 
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("Uyarı Alındı")
          .setDescription(`**Uyarıyı Alan:** ${interaction.user}\n**Uyarılmış Kullanıcı:** ${kullanici}\n**Uyarı:** ${rol}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısından ${rol} uyarısı başarıyla alındı!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Uyarı alırken bir hata oluştu!", ephemeral: true });
    }
  }
};
