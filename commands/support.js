

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "support",
  description: "Mengenai bot dan discord link",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const supportServerLink = "https://discord.gg/X6RT5VdJPQ";
      
        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
              name: 'DJ Sebelah',
              iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=6638ae28&is=66375ca8&hm=13e4a1b91a95b2934a39de1876e66c11711c7b30ac1a91c2a158f2f2ed1c2fc6&', 
              url: 'https://discord.gg/X6RT5VdJPQ'
          })
            .setDescription(`👋🏻**Salam Sebelah Wahai Sahabat Organik Sekalian👋🏻**!\n
            🕺🏻 **<@1166579917576740905> merupakan DJ yang telah dilantik oleh <@267958390389604362> untuk menyajikan lagu kegemaran anda di segenap server.** \n
            ➡️ **Sertai Discord server kami untuk sebarang info dan update:**\n- Discord - ${supportServerLink}\n\n`)
            .setImage('https://media.tenor.com/WDwFEWQxdFAAAAAi/fish.gif')
            .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};

