// KingCh1ll //
// Last Edited: 7/19/2021 //
// Index.js //

// Librarys //
const { Collection, Intents } = require("discord.js")
const dotenv = require("dotenv")

const logger = require("./modules/logger")

// Load //
console.log(require("chalk").blue("   ____ _     _ _ _ ____  _           "))
console.log(require("chalk").blue("  / ___| |__ / | | | __ )| | _____  __"))
console.log(require("chalk").blue(" | |   | '_ \| | | |  _ \| |/ _ \ \/ /"))
console.log(require("chalk").blue(" | |___| | | | | | | |_) | | (_) >  < "))
console.log(require("chalk").blue("  \____|_| |_|_|_|_|____/|_|\___/_/\_\ "))

// Start //
dotenv.config({
    path: __dirname + "/.env"
})

process.on("uncaughtException", (err) => {
    logger(err.stack, "error")
})

process.on("unhandledRejection", (err) => {
    logger(err.stack, "error")
})

const Client = require("./structures/client")
const Ch1llBlox = new Client({
    bot: {
        intents: [
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        ],
        partials: [
            "CHANNEL",
            "GUILD_MEMBER",
            "MESSAGE",
            "REACTION",
            "USER"
        ],
        allowedMentions: {
            parse: [
                "users",
                "roles",
                "everyone"
            ],
            repliedUser: true
        },
        presence: {
            activity: {
                name: `Ch1ll Studio's support queue`,
                type: "WATCHING"
            },
            status: "online"
        },
        fetchAllMembers: true
    }
})
Ch1llBlox.RelatedMessages = new Collection()
Ch1llBlox.TicketChannels = new Collection()

Ch1llBlox.SupportMessage = `
__**Ch1ll Studios Support**__
*Type the number that describes the problem your experiencing. I'll try to assist you the best way I can. If I cannot, I'll direct you to Ch1ll Studio's Support Team.*

**Ch1ll Studio**
:one: - Example Reply.

**Ch1llBlox**
:two: - Example reply 2.

**Other**
:three: - Example reply 3.

*Problem not on this list? Create a ticket! Just send, "?open". A support member will be with you within 24 hours.*
`
Ch1llBlox.SupportReplys = {
    "1": "Example reply.",
    "2": "Example reply 2.",
    "3": "Example reply 3."
}

// Functions //
async function Start() {
    await Ch1llBlox.LoadEvents(__dirname)

    await Ch1llBlox.LoadModules()
}

Start()
Ch1llBlox.login(process.env.token)