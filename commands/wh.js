const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

const {QuickDB} = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "wl-ver",
  description: "aa",
  type: 1,
  options: [
    {
        name: "user",
        description: "Rolün verileceği kullanıcıyı etiketleyin.",
        type: 6,
        required: true
      }
  ],
  
  run: async(client, interaction) => {
    if (!interaction.member.roles.cache.has('1065259014218326127')) return interaction.reply("Yetersiz yetki")
    
    const table = db.table("registercount");
    const whperm = "1023625273234690209";
    const unwhperm = "1023625276439146516";
    const whlog = "1065636820609683487";
    const user = interaction.options.getMember("user")
  

        await user.roles.add(whperm);
        await user.roles.remove(unwhperm);
        await table.add(`registercount_${interaction.user.id}`, 1)

        const logKanal = interaction.guild.channels.cache.get(whlog);   
        if(logKanal) {
            const registerlog = new EmbedBuilder()
                .setColor('#00f55e')
                .setTitle('WegasV - Kayıt Log')
                .setDescription('Kayıt işlemi başarılı bir şekilde gerçekleşti')
                .addFields(
                    { name: "Kaydı gerçekleşen kullanıcı : ", value: `${user}`, inline: false },
                    { name: "Kaydı yapan yetkili : ", value: `${interaction.user}`, inline: false },
                    { name: "Yetkilinin Toplam Kaydı :", value: `${await table.get(`registercount_${interaction.user.id}`)}`, inline: false }
                )
                .setThumbnail(interaction.user.avatarURL())
                .setTimestamp()
                .setFooter({ text: 'Wegas System'});
            logKanal.send({ embeds: [registerlog] });
        }
    interaction.reply({ content: `${user} başarıyla kayıt edildi.`, ephemeral: false });
  }
};