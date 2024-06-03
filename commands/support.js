const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "support",
  description: "Dapatkan link support server DJ Sebelah",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const supportServerLink = "https://discord.gg/X6RT5VdJPQ";
      const githubLink = "https://github.com/";
      const replitLink = "https://replit.com/@";
      const youtubeLink = "https://www.youtube.com/@";
        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
              name: 'Support Server',
              iconURL: 'https://cdn.discordapp.com/avatars/1166579917576740905/ff6612659d33718880e9373e757b02d8.webp?size=400', 
              url: 'https://discord.gg/X6RT5VdJPQ'
          })
            .setDescription(`➡️ **Sertai Discord server kami untuk support and update:**\n- Discord - ${supportServerLink}\n\n➡️ 
            .setImage('https://media.tenor.com/WDwFEWQxdFAAAAAi/fish.gif')
            .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};
