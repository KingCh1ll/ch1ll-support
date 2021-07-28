const mongoose = require("mongoose")

const config = require("../../globalconfig.json")

const Schema = new mongoose.Schema({
    id: { type: String },
    registrationDate: { type: Number, default: Date.now() },

    // Data //
    members: { type: Object, default: {} },
    casesCount: { type: Number, default: 0 },
    ignoredChannels: { type: Array, default: [] },
    customCommands: { type: Array, default: [] },
    commands: { type: Array, default: [] },
    autoRemoveCommands: { type: Boolean, default: false },
    slowmode: { type: Object, default: {
        users: [],
        channels: []
    }},

    // Guild Settings //
    settings: {
        type: Object, 
        default: {
            prefix: "^",
            welcome: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false
            },
            goodbye: {
                enabled: false,
                channel: null,
                message: null,
                image: null,
                embed: false
            },
            language: "US-en",
            autorole: {
                enabled: false,
                role: null
            },
            automod: {
                enabled: false,
                ignored: []
            },
            warnsInfractions: {
                kick: false,
                ban: false
            },
            tickets: {
                enabled: false,
                category: null
            },
            suggestions: false,
            modlogs: false,
            reports: false
        }
    },
})

module.exports = mongoose.model("Guild", Schema)