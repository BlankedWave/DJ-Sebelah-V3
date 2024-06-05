
const { Riffy } = require("riffy");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { queueNames } = require("./commands/play"); 

function initializePlayer(client) {
    const nodes = [  //CHANGE NODES HERE!!
  {
    host: "us1.lavalink.creavite.co",
    port: 20080, 
    password: "auto.creavite.co", 
     secure: false
  },
    ];

    client.riffy = new Riffy(client, nodes, {
        send: (payload) => {
            const guildId = payload.d.guild_id;
            if (!guildId) return;

            const guild = client.guilds.cache.get(guildId);
            if (guild) guild.shard.send(payload);
        },
        defaultSearchPlatform: "spsearch",
        restVersion: "v4"
    });

    client.riffy.on("nodeConnect", node => {
        console.log(`Node "${node.name}" connected.`);
    });

    client.riffy.on("nodeError", (node, error) => {
        console.error(`Node "${node.name}" encountered an error: ${error.message}.`);
    });

    client.riffy.on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);

   
        const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setAuthor({
            name: 'Sedang Memainkan',
            iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236664581364125787/music-play.gif?ex=6638d524&is=663783a4&hm=5179f7d8fcd18edc1f7d0291bea486b1f9ce69f19df8a96303b75505e18baa3a&', 
            url: 'https://discord.gg/X6RT5VdJPQ'
        })
        .setDescription(`🎵 **Lagu:** [${track.info.title}](${track.info.uri})\n\n🎤 **Penyanyi:** ${track.info.author}\n\n🎧 **Platform:** YouTube/Spotify/SoundCloud`)

        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=663939fa&is=6637e87a&hm=e02431de164b901e07b55d8f8898ca5b1b2832ad11985cecc3aa229a7598d610&`)
        .setThumbnail(track.info.thumbnail)
        .setTimestamp()
        .setFooter({ text: 'Sila gunakan butang di bawah ini untuk mengawal radio!'}); 



        const queueLoopButton = new ButtonBuilder()
            .setCustomId("loopQueue")
            .setLabel("Ulang 🔁")
            .setStyle(ButtonStyle.Primary);

        const disableLoopButton = new ButtonBuilder()
            .setCustomId("disableLoop")
            .setLabel("Matikan Ulang ❌")
            .setStyle(ButtonStyle.Primary);

        const skipButton = new ButtonBuilder()
            .setCustomId("skipTrack")
            .setLabel("Langkau ⏩")
            .setStyle(ButtonStyle.Success);

        const showQueueButton = new ButtonBuilder()
            .setCustomId("showQueue")
            .setLabel("Senarai 🎶")
            .setStyle(ButtonStyle.Primary);
        const clearQueueButton = new ButtonBuilder()
            .setCustomId("clearQueue")
            .setLabel("Kosongkan 🗑️")
            .setStyle(ButtonStyle.Danger);

    
        const actionRow = new ActionRowBuilder()
            .addComponents(queueLoopButton,  disableLoopButton, showQueueButton, clearQueueButton , skipButton);

       
        const message = await channel.send({ embeds: [embed], components: [actionRow] });

      
        const filter = i => i.customId === 'loopQueue' || i.customId === 'skipTrack' || i.customId === 'disableLoop' || i.customId === 'showQueue' || i.customId === 'clearQueue';
        const collector = message.createMessageComponentCollector({ filter, time: 180000 });
        setTimeout(() => {
            const disabledRow = new ActionRowBuilder()
                .addComponents(
                    queueLoopButton.setDisabled(true),
                    disableLoopButton.setDisabled(true),
                    skipButton.setDisabled(true),
                    showQueueButton.setDisabled(true),
                    clearQueueButton.setDisabled(true)
                );
        
          
            message.edit({ components: [disabledRow] })
                .catch(console.error);
        }, 180000);
        collector.on('collect', async i => {
            await i.deferUpdate();
            if (i.customId === 'loopQueue') {
                setLoop(player, 'queue');
                const loopEmbed = new EmbedBuilder()
            .setAuthor({
                    name: 'Loop Telah Dihidupkan!',
                    iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157318080670728283/7905-repeat.gif?ex=66383bb4&is=6636ea34&hm=65f37cf88245f1c09285b547fda57b82828b3bbcda855e184f446d6ff43756b3&', 
                    url: 'https://discord.gg/X6RT5VdJPQ'
                })
            .setColor("#00FF00")
            .setTitle("**Loop sudah Dihidupkan untuk Senarai Sekarang!**")
         

        await channel.send({ embeds: [loopEmbed] });
            } else if (i.customId === 'skipTrack') {
                player.stop();
                const skipEmbed = new EmbedBuilder()
                .setColor('#3498db')
                .setAuthor({
                  name: 'Lagu Dilangkau',
                  iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
                  url: 'https://discord.gg/FUEHs7RCqz'
                })
            .setTitle("**Radio akan memainkan lagu yang seterusnya!**")
            .setTimestamp();
               
    
            await channel.send({ embeds: [skipEmbed] });
            } else if (i.customId === 'disableLoop') {
                setLoop(player, 'none');
                const loopEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setAuthor({
                    name: 'Loop Telah Dimatikan!',
                    iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230836684774576168/7762-verified-blue.gif?ex=6638b97d&is=663767fd&hm=021725868cbbc66f35d2b980585489f93e9fd366aa57640732dc49e7da9a80ee&', 
                    url: 'https://discord.gg/X6RT5VdJPQ'
                })
                .setDescription('**Loop sudah Dimatikan untuk Senarai Sekarang!**');
                  
    
            await channel.send({ embeds: [loopEmbed] });
            } else if (i.customId === 'showQueue') {

const pageSize = 10; 

const queueMessage = queueNames.length > 0 ?
    queueNames.map((song, index) => `${index + 1}. ${song}`).join('\n') :
    "The queue is empty.";


const pages = [];
for (let i = 0; i < queueNames.length; i += pageSize) {
    const page = queueNames.slice(i, i + pageSize);
    pages.push(page);
}

for (let i = 0; i < pages.length; i++) {
    const numberedSongs = pages[i].map((song, index) => `${index + 1}. ${song}`).join('\n');

    const queueEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`Senarai Sekarang (Halaman ${i + 1}/${pages.length})`)
        .setDescription(numberedSongs);

    await channel.send({ embeds: [queueEmbed] });
}

            } else if (i.customId === 'clearQueue') {
                clearQueue(player);
                const queueEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setAuthor({
                    name: 'Senarai Dikosongkan',
                    iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230836684774576168/7762-verified-blue.gif?ex=6638b97d&is=663767fd&hm=021725868cbbc66f35d2b980585489f93e9fd366aa57640732dc49e7da9a80ee&', 
                    url: 'https://discord.gg/X6RT5VdJPQ'
                })
                .setDescription('**Lagu-lagu di dalam Senarai berjaya Dikosongkan!**');
               
    
            await channel.send({ embeds: [queueEmbed] });
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    });

    client.riffy.on("queueEnd", async (player) => {
        const channel = client.channels.cache.get(player.textChannel);
        const autoplay = false;

        if (autoplay) {
            player.autoplay(player);
        } else {
            player.destroy();
            const queueEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setDescription('**Lagu-lagu di dalam Senarai sudah tiada!❎ Gerak lu pape roger!👋🏻**');
               
    
            await channel.send({ embeds: [queueEmbed] });
        }
    });

  
    function setLoop(player, loopType) {
        if (loopType === "queue") {
            player.setLoop("queue");
        } else {
            player.setLoop("none");
        }
    }

  
    function clearQueue(player) {
        player.queue.clear();
        queueNames.length = 0; 
    }

    
    function showQueue(channel, queue) {
        const queueList = queue.map((track, index) => `${index + 1}. ${track.info.title}`).join('\n');
        const queueEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Queue")
            .setDescription(queueList);
        channel.send({ embeds: [queueEmbed] });
    }

    module.exports = { initializePlayer, setLoop, clearQueue, showQueue };
}

module.exports = { initializePlayer };


