const { Client, Collection, Intents } = require("discord.js")

const util = require("util")
const fs = require("fs")
const path = require("path")
const moment = require("moment")

moment.relativeTimeThreshold("s", 60)
moment.relativeTimeThreshold("ss", 5)
moment.relativeTimeThreshold("m", 60)
moment.relativeTimeThreshold("h", 60)
moment.relativeTimeThreshold("d", 24)
moment.relativeTimeThreshold("M", 12)

class bot extends Client {
    constructor(settings) {
        super(settings.bot)

        // Config
        this.config = require("../globalconfig.json")

        // Utils
        this.logger = require("../modules/logger")
        this.functions = require("../modules/functions")
        this.wait = util.promisify(setTimeout)

        // Database
        this.database = require("../database/handler")

        this.GuildSchema = require("../database/schemas/guild")
        this.LogSchema = require("../database/schemas/log")
        this.MemberSchema = require("../database/schemas/member")
        this.UserSchema = require("../database/schemas/user")

        // Commands
        this.categories = new Collection()
        this.commands = new Collection()
        this.aliases = new Collection()
        this.events = new Collection()
        this.cooldowns = new Collection()

        return this
    }

    async LoadModules(settings){
        this.functions.setBot(this)
    }

    async LoadEvents(MainPath){
        fs.readdir(path.join(`${MainPath}/events`), (err, files) => {
            if (err) {
              return this.logger(`EVENT LOADING ERROR - ${err}`, "error")
            }
          
            files.forEach(file => {
              let EventName = file.split(".")[0]
              let FileEvent = require(`../events/${EventName}`)
   
              this.on(EventName, (...args) => FileEvent.run(this, ...args))
            })
          })
    }

    async LoadCommands(MainPath){
        fs.readdir(path.join(`${MainPath}/commands`), (err, cats) => {
            if (err) {
                return this.logger(`Commands failed to load! ${err}`, "error")
            }

            cats.forEach(cat => {
                this.categories.set(cat, cat)

                fs.readdir(path.join(`${MainPath}/commands/${cat}`), (err, files) => {
                    files.forEach(file => {
                        if (!file.endsWith(".js")) {
                            return
                        }

                        let commandname = file.split(".")[0]
                        let FileJs = require(`./commands/${cat}/${commandname}`)

                        this.commands.set(commandname, FileJs)
                    })
                })
            })
        })
    }
}

module.exports = bot