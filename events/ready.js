const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    // Ajoutez d'autres intents selon vos besoins
] });

// Charge les commandes depuis le dossier "commands"
const fs = require('fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

client.once('ready', async () => {
    console.log(`Le bot ${client.user.tag} est connecté !`);

    // Enregistre les commandes globalement
    await client.application.commands.set(commands);
    console.log('Commandes enregistrées !');
});

client.login(process.env.TOKEN);