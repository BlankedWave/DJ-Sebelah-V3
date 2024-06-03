const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

const queueNames = [];

async function play(client, interaction) {
    try {
        const query = interaction.options.getString('name'); 

        const player = client.riffy.createConnection({
            guildId: interaction.guildId,
            voiceChannel: interaction.member.voice.channelId,
            textChannel: interaction.channelId,
            deaf: true
        });

     
        await interaction.deferReply();

   
        const resolve = await client.riffy.resolve({ query: query, requester: interaction.user });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.user;
                player.queue.add(track);
                queueNames.push(track.info.title); 
            }

            if (!player.playing && !player.paused) player.play();

        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = interaction.user;

            player.queue.add(track);
            queueNames.push(track.info.title);

            if (!player.playing && !player.paused) player.play();
        } else {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('There are no results found.');

        
            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

       
        await new Promise(resolve => setTimeout(resolve, 500));
        
     
const { EmbedBuilder } = require("discord.js");


const embeds = [
  
    new EmbedBuilder()
        .setColor('#4d9fd6')
        .setAuthor({
            name: 'Permohonan Telah Dikemaskini!',
            iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236794583732457473/7828-verify-ak.gif?ex=66394e37&is=6637fcb7&hm=923d3f3b300606a2ae4ceb7bae980fd533a4c5ee2cf73111569a892a595f1f69&', 
            url: 'https://discord.gg/xQF9f9yUEM'
        })
        .setDescription('➡️ **Permohonan and telah berjaya diproses.**\n➡️** Sila guna butang untuk mengawal radio ini**'),

 
    new EmbedBuilder()
    .setColor('#ffea00')
    .setAuthor({
        name: 'Permohonan Telah Dikemaskini!',
        iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236802032938127470/4104-verify-yellow.gif?ex=66395527&is=663803a7&hm=71a7fba7f91897e52d9645b45d85d3da0ff97af2b63d10960004e68ff40d9c3b&', 
        url: 'https://discord.gg/xQF9f9yUEM'
    })
    .setDescription('➡️ **Permohonan and telah berjaya diproses.**\n➡️** Sila guna butang untuk mengawal radio ini**'),

  
    new EmbedBuilder()
    .setColor('#FF0000')
    .setAuthor({
        name: 'Permohonan Telah Dikemaskini!',
        iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236802049190920202/4104-verify-red.gif?ex=6639552b&is=663803ab&hm=8dbc851fe56441b916a0044152dd517ed26434a11ee506518382f380c527c3bd&', 
        url: 'https://discord.gg/xQF9f9yUEM'
    })
    .setDescription('➡️ **Permohonan and telah berjaya diproses.**\n➡️** Sila guna butang untuk mengawal radio ini**')
];


const randomIndex = Math.floor(Math.random() * embeds.length);


await interaction.followUp({ embeds: [embeds[randomIndex]] });

    } catch (error) {
        console.error('Error processing play command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('An error occurred while processing your request.');

     
        await interaction.editReply({ embeds: [errorEmbed] });
    }
}

module.exports = {
    name: "play",
    description: "Mainkan lagu pilihan anda",
    permissions: "0x0000000000000800",
    options: [{
        name: 'Tajuk Lagu',
        description: 'Masukkkan tajuk lagu / link atau playlist',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: play,
    queueNames: queueNames
};
