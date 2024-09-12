const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Vérifie la latence du bot.'),
    async execute(interaction) {
        const message = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = message.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('Pong!')
            .setDescription(`La latence du bot est de **${latency}ms**.`);

        await interaction.editReply({ embeds: [embed] });
    },
};