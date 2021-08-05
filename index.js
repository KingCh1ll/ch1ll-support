// KingCh1ll //
// Last Edited: 7/19/2021 //
// Index.js //

// Librarys //
const { Collection, Intents } = require("discord.js")
const disbuttons = require("discord-buttons")
const dotenv = require("dotenv")
const express = require("express")

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
const Web = express()
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
                name: `Ch1ll Studio's Support Queue`,
                type: "WATCHING"
            },
            status: "online"
        },
        fetchAllMembers: true
    }
})

disbuttons(Ch1llBlox)

Ch1llBlox.RelatedMessages = new Collection()
Ch1llBlox.TicketChannels = new Collection()

// Functions //
async function Start() {
    await Ch1llBlox.LoadEvents(__dirname)
    await Ch1llBlox.LoadCommands(__dirname)

    await Ch1llBlox.LoadModules()

    Web.get('*', function (req, res) {
      res.status(200).send({ response: 200, message: "online"});
    })

    Web.listen(3000, () => console.log("📋 | Website online."))
}

Start()

Ch1llBlox.login(process.env.token)