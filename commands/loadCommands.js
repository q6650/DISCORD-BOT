const fs = require('fs');

module.exports = (client, directory) => {
  const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`${directory}/${file}`);

    // Vérification de la structure de la commande
    if (!command.data || !command.execute) {
      console.log(`[WARNING] La commande dans ${file} ne possède pas les propriétés requises.`);
      continue;
    }

    // Ajout de la commande au client
    client.commands.set(command.data.name, command);
  }
};