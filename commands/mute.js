const { Client, EmbedBuilder, Permissions } = require("discord.js");

const muteRolId = "1077888438205956127";

module.exports = {
  name: "mute",
  description: "Bir kullanıcıyı belirli bir süre boyunca susturur.",
  type: 1,
  options: [
    {
      name: "kullanici",
      description: "Susturulacak kullanıcıyı etiketleyin.",
      type: 6,
      required: true
    },
    {
      name: "sebep",
      description: "Susturma sebebini belirtin.",
      type: 3,
      required: false 
    },
    {
      name: "sure",
      description: "Mute süresini dakika cinsinden belirtin.",
      type: 4,
      required: false 
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")

    const kullanici = interaction.options.getMember("kullanici");
    const sebep = interaction.options.getString("sebep") || "Belirtilmedi"; 
    const sure = interaction.options.getInteger("sure") || 0; 

    if (!kullanici) {
      return interaction.reply({ content: "Hatalı komut kullanımı! Susturulacak kullanıcıyı etiketleyin.", ephemeral: true });
    }

    try {
      await kullanici.roles.add(muteRolId, sebep);


      if (sure > 0) {
        setTimeout(() => {
          kullanici.roles.remove(muteRolId, "Mute süresi sona erdi.");
          kullanici.send({ content: "Muteniz açılmıştır. Artık konuşabilirsiniz." });
        }, sure * 60 * 1000);
      }

      const logKanalId = "1130009936303235132"; 
      const logKanal = interaction.guild.channels.cache.get(logKanalId);

      if (logKanal) {
        const logEmbed = new EmbedBuilder()
          .setColor("#f50000")
          .setTitle("Kullanıcı Susturuldu")
          .setDescription(`**Susturulan Kullanıcı:** ${kullanici}\n**Susturan Yetkili:** ${interaction.user}\n**Sebep:** ${sebep}\n**Mute Süresi:** ${sure === 0 ? "Süresiz" : `${sure} dakika`}\n**Mute Rölü:** ${muteRolId}`)
          .setTimestamp();

        logKanal.send({ embeds: [logEmbed] });
      }

      interaction.reply({ content: `${kullanici} kullanıcısı başarıyla susturuldu!\n**Sebep:** ${sebep}\n**Mute Süresi:** ${sure === 0 ? "Süresiz" : `${sure} dakika`}`, ephemeral: false });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Susturma işlemi sırasında bir hata oluştu!", ephemeral: true });
    }
  }
};
