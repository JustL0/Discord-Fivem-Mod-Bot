const { Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = async (client, interaction, db) => {
  if (interaction.isCommand()) {
    const commandName = interaction.commandName.toLowerCase();
    const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const cmd = require(`../commands/${file}`);
      if (cmd.name.toLowerCase() === commandName) {
        return cmd.run(client, interaction);
      }
    }
  }
};
