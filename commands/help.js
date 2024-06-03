const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: "help",
  description: "Maklumat tentang bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
     

      const embed = new EmbedBuilder()
         .setColor('#0099ff')
      .setTitle('💎 Prime Music Bot')
      .setDescription('Welcome to the Music Bot!\n\n- Here are the available commands:\n\n' +
        '**/play :** Mainkan lagu.\n' +
        '**/ping :** Check bot latency.\n' +
        '**/support :** Tunjuk maklumat support server');

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};
