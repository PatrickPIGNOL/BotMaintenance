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
const Command = require("../Command.js");
class Unwarn extends Command {
  constructor() {
    super(
      "unwarn",
      [],
      [
        "ADMINISTRATOR"
      ],
      1,
      0,
      "unwarn <IDWarn>",
      "Unwarn détruit le warn grâce à son <IDWarn> founis par la commande \"listwarns\".",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args).catch(e => {
      console.log(e);
      message.reply(e);
      message.delete();
      return; 
    });
    if(isNaN(args[0]))
    {
      message.reply(`${args[0]} n'est pas un identifiant valide.`);
      message.delete();
      return;
    }
    pDiscordBot.SQL.delWarns.run(args[0]);
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("Unwarn")
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(`Le warn avec l'id "${args[0]}" à bien été supprimé si il existait.`)
      .setThumbnail(message.author.displayAvatarURL());
    const vSanctionsChannel = message.guild.channels.cache.find(vChannelFound => vChannelFound.name === pDiscordBot.Config.Parameters[message.guild.id]["SanctionsChannel"]);
    if(vSanctionsChannel)
    {
      vSanctionsChannel.send(vEmbed);
    }
    message.delete();
  }
}

module.exports = new Unwarn();
