/*
Config.json comments :
,
  "Points": "https://l-pbot.glitch.me/points",
  "HelloWorldGreetings": "https://pignol.ovh/h/thor/hello-world.gif",
  "BAN":"https://pignol.ovh/h/thor/ban.gif",
  "KICK": "https://pignol.ovh/h/thor/kick.gif",
  "ShutUp": "https://pignol.ovh/h/thor/shutup.gif",
  "Talk":"https://pignol.ovh/h/thor/handshake.gif",
  "One":"https://pignol.ovh/h/thor/one.gif",
  "Two":"https://pignol.ovh/h/thor/two.gif",
  "Blast":"https://pignol.ovh/h/thor/blast.gif"
  
*/

/*
    Object Based Discord Bot, a simple Object Based Discord Bot squeleton.
    Copyright ©️ 2020 Patrick PIGNOL <mailto:patrick.pignol@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const fs = require("fs");
class DiscordBot {
  constructor() {
    this.aDiscord = require("discord.js");
    this.aClient = new this.aDiscord.Client();
    this.aClient.commands = new this.aDiscord.Collection();
    const vCommandFiles = fs
      .readdirSync("./commands")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vCommandFiles) {
      const vCommand = require(`./commands/${vFile}`);
      this.aClient.commands.set(vCommand.Name, vCommand);
    }
    this.aConfig = require("./config.json");
    this.aSQLite = require("better-sqlite3");
    this.aSQL = new this.aSQLite("./discordbot.sqlite");
  } 
  mLogin() {
    this.aClient.login(process.env.TOKEN);
    this.aClient.clearImmediate();
    this.aClient.removeAllListeners();

    const vEventsFiles = fs
      .readdirSync("./events")
      .filter(vFileFound => vFileFound.endsWith(".js"));
    for (const vFile of vEventsFiles) {
      const vEvent = require(`./events/${vFile}`);
      this.aClient.on(vEvent.EventName, (...args) => {
        vEvent.mExecute(this, ...args);
      });
    }
  }
  get Discord() {
    return this.aDiscord;
  }
  get Client() {
    return this.aClient;
  }
  get Config() {
    return this.aConfig;
  }
  get SQL() {
    return this.aSQL;
  }
}

module.exports = new DiscordBot();
