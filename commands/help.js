const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste de toutes les commandes'),
    async execute(interaction) { // Notez le mot-clé async ici
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des commandes')
            .setDescription('Voici la liste de toutes les commandes disponibles :');

        commands.forEach(command => {
            embed.addFields({
                name: `/${command.data.name}`,
                value: command.data.description,
            });
        });

        await interaction.reply({ embeds: [embed] });
    },
};