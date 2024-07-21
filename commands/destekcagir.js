const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "destek-çağır",
  description: "Destek çağırma komutu.",
  type: 1,
  options: [
    {
      name: "kisi",
      description: "Destek çağırmak istediğiniz kişiyi etiketleyin.",
      type: 6,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const destekOdaId = "1076446776191635496"; // Destek çağırma embedinin gönderileceği oda ID'si
    const logKanalId = "1130023371615252511"; // Çağırma loglarının tutulacağı log kanalı ID'si

    const kisi = interaction.options.getMember("kisi");
    const destekOda = client.channels.cache.get(destekOdaId);
    const logKanal = client.channels.cache.get(logKanalId);

    if (!kisi || !destekOda || !logKanal) {
      return interaction.reply({ content: "Komutu düzgün kullanamadınız veya gerekli kanallar bulunamadı.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Destek Çağırılıyorsun!")
      .setDescription(`${interaction.user.toString()} seni destek odasına çağırmak istiyor: ${kisi}`)

    destekOda.send({ content: `|| ${kisi} ||`, embeds: [embed],});
    

    const logEmbed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Destek Çağırma Logu")
      .addFields(
        { name: "Çağıran Kişi", value: interaction.user.toString(), inline: false },
        { name: "Çağrılan Kişi", value: kisi.toString(), inline: false },
        { name: "Çağırma Saati", value: new Date().toLocaleString(), inline: false }
      );

    logKanal.send({ embeds: [logEmbed] });

    interaction.reply({ content: `${kisi} destek odasına çağırıldı!`, ephemeral: true });
  },
};
