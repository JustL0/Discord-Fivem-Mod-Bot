const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "perm-ver",
  description: "Bir kişiye rol vermeni sağlar.(STAFF)",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Rolün verileceği kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "rol",
      description: "Verilecek rolü seçin.",
      type: 8,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici"); // Use getMember() instead of getUser()
    const rol = interaction.options.getRole("rol");

    if (!kullanici || !rol) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Kullanıcı ve rol seçeneklerini eksiksiz belirtmelisiniz.", ephemeral: true });
    }


    try {
      await kullanici.roles.add(rol);


      const logKanalId = "1129982712871133244"; 
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#00FF00")
          .setTitle("Rol Verildi")
          .setDescription(`**Rol Veren:** ${interaction.user}\n**Kullanıcı:** ${kullanici}\n**Rol:** ${rol}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısına ${rol} rolü başarıyla verildi!`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Rol verirken bir hata oluştu!", ephemeral: true });
    }
  }
};
