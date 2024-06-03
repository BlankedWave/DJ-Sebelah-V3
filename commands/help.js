

const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: "help",
  description: "Dapatkan maklumat tentang bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
     

      const embed = new EmbedBuilder()
         .setColor('#0099ff')
      .setTitle('💎 DJ Sebelah')
      .setDescription('Selamat datang ke Sebelah FM!\n\n- Ini adalah semua command yang ada:\n\n' +
        '**/play :** Mula mainkan lagu.\n' +
        '**/ping :** Check bot latency.\n' +
        '**/support :** Menunjukkan maklumat support server');

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};


