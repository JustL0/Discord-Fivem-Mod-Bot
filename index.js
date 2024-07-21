const { Client, GatewayIntentBits, Partials, EmbedBuilder, MessageReaction } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: [
      "users",
      "everyone"
    ]
  },
  partials: PARTIALS,
  retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");

readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

  const props = require(`./commands/${f}`);

  client.commands.push({
    name: props.name.toLowerCase(),
    description: props.description,
    options: props.options,
    dm_permission: props.dm_permission,
    type: 1
  });
  console.log(`[COMMAND] ${props.name} komutu yüklendi.`)
});

readdirSync('./events').forEach(e => {
  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
    eve(client, ...args)
  });
  console.log(`[EVENT] ${name} eventi yüklendi.`)
});

client.login(TOKEN)
///////////////////
// Otomatik Nickname değiştirici
client.on('messageCreate', (message) => {
  if (message.channel.id === '1079201749849604179') {
    const user = message.member;
    const newNickname = message.content;

    user.setNickname(newNickname)
      .then(() => {
        console.log(`${user.displayName}'ın adı "${newNickname}" olarak güncellendi.`);
        message.react('<:online2:1068994489986846750>');
      })
      .catch((error) => {
        console.error(`Adı değiştirirken bir hata oluştu: ${error}`);
      });
  }
});
// Otomatik Nickname değiştirici
////////////////////////////////
// SESTE DURMA
const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get("1078106645797814322") 
  
  const VoiceConnection = joinVoiceChannel({
    channelId: channel.id, 
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator 
  });
})
// SESTE DURMA
////////////////////////////////
// OTOROL VE OTO ISIM
client.on("guildMemberAdd", async member => {
  let log = "1129974784491532288";
  let rol = "1023625276439146516";

  member.setNickname('IC ISIM').catch(err => {});
  member.roles.add(rol).catch(err => {});

  // Embed oluştur
  const welcomelog = new EmbedBuilder()
    .setColor("#00ff00") // Embed'in rengi (isteğe bağlı)
    .setTitle("Yeni Üye Katıldı")
    .setDescription(`${member.displayName} sunucuya katıldı.`)
    .addFields(
      { name: "İsim Değiştirildi", value: `${member}`, inline: true },
      { name: "Verilen Rol", value: `${rol}`, inline: true }
    )
    .setTimestamp();

  // İlgili log kanalına gönder
  const logChannel = member.guild.channels.cache.get(log);
  if (logChannel) {
    client.channels.cache.get(log).send({ embeds: [welcomelog]}).catch(err => {})
  }
});
// OTOROL VE OTO ISIM
////////////////////////////////