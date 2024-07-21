const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "uyarı-ver",
  description: "Bir kişiye uyarı vermeni sağlar.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Uyarı verilecek kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "sebep",
      description: "Uyarının sebebini belirtin.",
      type: 3,
      required: true
    },
    {
      name: "uyarı_miktarı",
      description: "Verilecek uyarı miktarını içeren rolü seçin.",
      type: 8,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici");
    const sebep = interaction.options.getString("sebep");
    const uyariMiktariRol = interaction.options.getRole("uyarı_miktarı");

    if (!kullanici || !sebep || !uyariMiktariRol) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Kullanıcı, sebep ve uyarı miktarı seçeneklerini eksiksiz belirtmelisiniz.", ephemeral: true });
    }

    try {
      await kullanici.roles.add(uyariMiktariRol);

      const logKanalId = "1130002477060718625"; //LOG 
      const logKanal2Id = "1130312667719028876"; //UyarıDuyuru

      const logKanal = interaction.guild.channels.cache.get(logKanalId);
      const logKanal2 = interaction.guild.channels.cache.get(logKanal2Id);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("Kullanıcıya Uyarı Verildi")
          .setDescription(`**Uyarı Veren:** ${interaction.user}\n**Kullanıcı:** ${kullanici}\n**Sebep:** ${sebep}\n**Uyarı Miktarı:** ${uyariMiktariRol}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      if (logKanal2) {
        const logEmbed2 = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("Kullanıcıya Uyarı Verildi")
          .setDescription(`**Uyarı Veren:** ${interaction.user}\n**Kullanıcı:** ${kullanici}\n**Sebep:** ${sebep}\n**Uyarı Miktarı:** ${uyariMiktariRol}`)
          

        logKanal2.send({ embeds: [logEmbed2] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısına ${sebep} uyarısı başarıyla verildi!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Uyarı verirken bir hata oluştu!", ephemeral: true });
    }
  }
};
