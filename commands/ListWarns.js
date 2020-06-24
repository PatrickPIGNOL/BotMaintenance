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
class ListeWarns extends Command {
  constructor() {
    super(
      "listewarns",
      ["listwarn","listwarns"],
      [
        "ADMINISTRATOR"
      ],
      0,
      0,
      "listwarns",
      "Liste tous les warns du serveur.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) { 
    super.mExecute(pDiscordBot, message, args).catch(e => {
      console.log(e);
      message.channel.send(e);
      message.delete();
      return;
    });
    const vWarns = pDiscordBot.SQL.getWarns.all(message.guild.id);
    let vMessage = "";
    if(vWarns.length === 0)
    {
      vMessage = "*La liste des Warns est vide ...*";
    }
    vWarns.forEach(vWarn=> { 
      let vDate = new Date();
      vDate.setTime(vWarn.Date);
      vMessage += `----------------\n**ID : ${vWarn.rowid}**, date : ${vDate.toISOString()}\nModérateur : ${pDiscordBot.Client.users.resolve(vWarn.ModeratorID)}\nUtilisateur : ${pDiscordBot.Client.users.resolve(vWarn.MemberID)}\n Raison : "${vWarn.Reason}"\n`;
    });
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      ) 
      .setTitle("Liste des WARNs")
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(vMessage)
      .setThumbnail(message.author.displayAvatarURL());
    const vSanctionsChannel = message.guild.channels.cache.find(vChannelFound => vChannelFound.name === pDiscordBot.Config.Parameters[message.guild.id]["SanctionsChannel"]);
    if(vSanctionsChannel)
    {
      vSanctionsChannel.send(vEmbed);
    }
    message.delete();
  }
}

module.exports = new ListeWarns();
