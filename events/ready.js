const Discord = require("discord.js");
const { MessageButton } = require("discord-buttons");

exports.run = async bot => {
    global.channel = await bot.channels.cache.get("763871537585061958");

    if (!global.channel) {
        global.channel = await bot.channels.fetch("763871537585061958");
        global.channel = await bot.channels.cache.get("763871537585061958");
    }

    await global.channel.messages.fetch().then(async messages => {
        global.channel.bulkDelete(messages).catch(err => { });

        const SupportEmbed = new Discord.MessageEmbed()
            .setTitle("__**Ch1ll Support**__")
            .setDescription(`
            **Ch1ll Studio**
            1️⃣ - How do I purchase premium?

            **Ch1llBlox**
            2️⃣ - How do you invite Ch1llBlox?
            3️⃣ - How do you customize Ch1llBlox?
            4️⃣ - Ch1llBlox's audio quality sounds really laggy.
            5️⃣ - I can't hear Ch1llBlox!
            6️⃣ - Ch1llBlox is not responding to my commands / not responding at all.

            ☎ - None of the options above helped me. (Live support)
            `)
            .setFooter("Tap the button below that matches with the number of the problem on the list above that you have.")
            .setColor("BLUE");

        const B1 = new MessageButton()
            .setLabel("1")
            .setID("B1")
            .setStyle("blurple");

        const B2 = new MessageButton()
            .setLabel("2")
            .setID("B2")
            .setStyle("blurple");

        const B3 = new MessageButton()
            .setLabel("3")
            .setID("B3")
            .setStyle("blurple");

        const B4 = new MessageButton()
            .setLabel("4")
            .setID("B4")
            .setStyle("blurple");

        const B5 = new MessageButton()
            .setLabel("5")
            .setID("B5")
            .setStyle("blurple");

        const B6 = new MessageButton()
            .setLabel("6")
            .setID("B6")
            .setStyle("blurple");

				const openTicket = new MessageButton()
					.setLabel("")
          .setEmoji("☎")
					.setID("BT")
					.setStyle("blurple");

				const holderButton = new MessageButton()
					.setLabel("\u200b")
					.setStyle("blurple")
          .setID("BH") 
					.setDisabled(true)

        const SMessage = await global.channel.send({
            embed: SupportEmbed,
            components: [
                {
                    type: 1,
                    components: [
                        B1,
                        B2,
                        B3
                    ]
                },
                {
                    type: 1,
                    components: [
                        B4,
                        B5,
                        B6
                    ]
                },
								{
                    type: 1,
                    components: [
                        holderButton,
                        openTicket,
                        holderButton
                    ]
                },
            ]
        });

        messageID = await SMessage.id;

        setInterval(async () => {
            await global.channel.messages.fetch().then(FetchedMessages => {
                if (!FetchedMessages || FetchedMessages.length <= 0) {
                    return;
                }

                const MessagesToDelete = FetchedMessages.filter(msg => (msg.id !== messageID));

                global.channel.bulkDelete(MessagesToDelete).catch(err => { });
            });
        }, 1 * 1000);
    });
};
