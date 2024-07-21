const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mesaj-sil",
  description: "Belirtilen kanaldaki mesajları siler.",
  type: 1,
  options: [
    {
      name: "kanal",
      description: "Mesajların silineceği kanalı belirtin.",
      type: 7,
      required: true
    },
    {
      name: "mesaj_sayisi",
      description: "Kaç mesajın silineceğini belirtin.",
      type: 4,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kanal = interaction.options.getChannel("kanal");
    const mesajSayisi = interaction.options.getInteger("mesaj_sayisi");

    if (!kanal || mesajSayisi <= 0) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Kanal ve mesaj sayısı seçeneklerini eksiksiz ve doğru bir şekilde belirtmelisiniz.", ephemeral: true });
    }

    try {
      const fetchedMessages = await kanal.messages.fetch({ limit: mesajSayisi });
      kanal.bulkDelete(fetchedMessages, true);

      const logKanalId = "1130007138899607605"; 
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("Mesajlar Silindi")
          .setDescription(`**Mesajları Silen:** ${interaction.user}\n**Kanal:** ${kanal}\n**Silinen Mesaj Sayısı:** ${mesajSayisi}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kanal} kanalında ${mesajSayisi} mesaj başarıyla silindi!`, ephemeral: true }); // EPHEMERAL kullanarak mesajı sadece sizin görebilmenizi sağlıyoruz.
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Mesajları silerken bir hata oluştu!", ephemeral: true });
    }
  }
};
