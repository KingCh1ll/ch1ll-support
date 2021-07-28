exports.run = async (bot) => {
    global.channel = await bot.channels.cache.get("763871537585061958")

    if (!global.channel){
        global.channel = await bot.channels.fetch("763871537585061958")
        global.channel = await bot.channels.cache.get("763871537585061958")
    }

    await global.channel.messages.fetch().then(async (messages) => {
        var messageID = messages.last()?.id

        if (!messageID){
            messageID = (await global.channel.send(bot.SupportMessage)).id
        }

        if (!messages.last()?.content === bot.SupportMessage){
            messages.last()?.edit(SupportMessage)
        }

        setInterval(async () => {
            await global.channel.messages?.fetch().then((FetchedMessages) => {
                if (!FetchedMessages || FetchedMessages.length <= 0){
                    return
                }

                const MessagesToDelete = FetchedMessages.filter((msg) => (Date.now() - msg.createdTimestamp) > 5 * 1000 && msg.id !== messageID)

                global.channel.bulkDelete(MessagesToDelete).catch((err) => {})
            })
        }, 1 * 1000)
    })

    const TicketsUnresolved = []

    for (const TChannelID of channel.guild.channels.cache.filter((channel) => channel.name.includes("ticket-") && channel.type === "text").map((channel) => channel.id)){
        const TChannel = bot.channels.cache.get(TChannelID)
        const Messages = await TChannel.messages.fetch()
        const TicketWelcomeMessage = Messages.find((message) => message.author.id === 557628352828014614 && message.content.includes("Welcome"))
        const UserID = TicketWelcomeMessage.mentions.users.first()?.id

        if (TicketWelcomeMessage && UserID){
            bot.TicketChannels.set(UserID, TChannelID)
        } else {
            TicketsUnresolved.push(TChannel.id)
        }
    }
}
