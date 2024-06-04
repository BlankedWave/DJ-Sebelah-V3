

const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: "help",
  description: "Dapatkan maklumat tentang command bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
     

      const embed = new EmbedBuilder()
         .setColor('#0099ff')
      .setTitle('💎 DJ Sebelah')
      .setDescription('Selamat datang ke Sebelah FM!\n\n- Ini adalah command yang dapat digunakan:\n\n' +
        '**/play :** Mula memainkan lagu anda.\n' +
        '**/ping :** Check latency bot.\n' +
        '**/support :** Menunjukkan maklumat tentang bot dan discord server');

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};


