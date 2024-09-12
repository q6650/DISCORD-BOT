const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Répète le message que tu as envoyé.')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Le message à répéter')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input);
    },
};