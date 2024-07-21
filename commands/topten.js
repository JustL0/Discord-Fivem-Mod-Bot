const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

const {QuickDB} = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "top-10",
  description: "En çok kayıt yapan 10 yetkiliyi gösterir",
  type: 1,
  options: [],
  
  run: async (client, interaction) => {
    const requiredPermission = ["1074299350143995923", "1065341579860127824", "1065341714581172254"];
    if (!interaction.member.permissions.has(requiredPermission)) {
      return interaction.reply({ content: "Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.", ephemeral: true });
    }

    const data = db.table("registercount");
    interaction.reply({ content: `Top 10 listesi yollanıyor.`, ephemeral: true });

    // Puanlarına göre sırala
    const sortedData = (await data.startsWith("registercount_")).sort((a, b) => b.value - a.value);

    sortedData.forEach((entry, index) => {
      const user = entry.id;
      const value = entry.value;
      const splitedID = entry.id.split("_");
      const userID = splitedID[1]; // take second element
      const topListKanalID = "1130283569525305424";
      const userTag = client.users.cache.get(userID);
      const topListKanal = interaction.guild.channels.cache.get(topListKanalID);
      const embed2 = new EmbedBuilder()
        .setTitle(`${index + 1}. ${userTag.username}`)
        .setColor('#EE6A14')
        .addFields(
          { name: `**<:staff:1027310615347347497> Toplam Yaptığı Kayıt : ${value.toString()}**`, value: "ㅤ" }
        )
        .setThumbnail(userTag.avatarURL())
        
      topListKanal.send({ embeds: [embed2] });
    });
  }  
};