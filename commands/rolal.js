const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "perm-al",
  description: "Bir kişiden rol almanı sağlar.(STAFF)",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Rolün alınacağı kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "rol",
      description: "Alınacak rolü seçin.",
      type: 8,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici");
    const rol = interaction.options.getRole("rol");


    if (!kullanici || !rol) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Kullanıcı ve rol seçeneklerini eksiksiz belirtmelisiniz.", ephemeral: true });
    }

  
    if (!kullanici.roles.cache.has(rol.id)) {
      return interaction.reply({ content: `${kullanici} kullanıcısının ${rol} rolü zaten bulunmamaktadır!`, ephemeral: true });
    }


    try {
      await kullanici.roles.remove(rol);


      const logKanalId = "1129982712871133244"; 
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("Rol Alındı")
          .setDescription(`**Rol Alan:** ${interaction.user}\n**Kullanıcı:** ${kullanici}\n**Rol:** ${rol}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısından ${rol} rolü başarıyla alındı!`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Rol alırken bir hata oluştu!", ephemeral: true });
    }
  }
};
