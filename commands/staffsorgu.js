const { Client, MessageEmbed, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "staff-sorgu",
  description: "aa",
  type: 1,
  options: [
    {
      name: "staff",
      description: "Hangi staff a bakmak istiyorsunuz",
      type: 6,
      required: true
    },
  ],
  
  run: async (client, interaction) => {
    const requiredPermission = ["1074299350143995923", "1065341579860127824", "1065341714581172254"]; // Yetkili rol adı
    if (!interaction.member.permissions.has(requiredPermission)) {
      return interaction.reply({ content: "Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.", ephemeral: true });
    }
    const table = db.table("registercount");
    const staffMember = interaction.options.getUser("staff");
    const staffMemberId = staffMember.id;

    const staffSorgu = new EmbedBuilder()
      .setColor('#EE6A14')
      .setTitle('WegasV - Staff Sorgu')
      .addFields(
        { name: "Sorgulanan yetkili   - ", value: `**${staffMember}**`, inline: true },
        { name: `Yetkilinin Toplam Kaydı`, value: `ㅤ**${await table.get(`registercount_${staffMemberId}`)}**`, inline: true }
      )
      .setThumbnail(staffMember.avatarURL())
      .setTimestamp()
      .setFooter({ text: 'Wegas System'});

    interaction.reply({ embeds: [staffSorgu] });
  }
};
