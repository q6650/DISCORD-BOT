require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent
    
] });

const commands = new Collection();

// Charger les commandes
loadCommands(client, './commands');

client.once('ready', async () => {
    console.log(`Connecté en tant que ${client.user.tag} !`);

    // Enregistrement des commandes globalement
    await client.application.commands.set(commands.map(command => command.data.toJSON()));
    console.log('Commandes enregistrées !');

    // Définition de l'activité du bot
    client.user.setActivity('Votre activité ici', { type: 'PLAYING' });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);