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
class Warn extends Command {
  constructor() {
    super(
      "Warn",
      [],
      [
        "ADMINISTRATOR"
      ],
      2,
      1,
      "warn <@IDUtilisateur> <Raison>",
      "Warn l'utilisateur <@IDUtilisateur> pour la raison <Raison>.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    const vMember = message.mentions.members.first();
    const vAuthor = message.author;    
    args.shift();
    const vReason = args.join(" ");
    const vWarns = {
      
      GuildID:`${message.guild.id}`, 
      GuildName:`${message.guild.name}`, 
      MemberID: `${vMember.user.id}`,
      MemberTag:`${vMember.user.tag}`,
      ModeratorID: vAuthor.id,
      ModeratorTag: vAuthor.tag,
      Date:Date.now(),
      Reason: vReason
    };
    pDiscordBot.SQL.setWarns.run(vWarns);
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("!WARN!")
      .setColor(pDiscordBot.aConfig.Warn)
      .setDescription(`L'utilisateur ${vMember} à été Warn par le modérateur ${vAuthor} pour la raison : "${vReason}"`)
      .setThumbnail(message.author.displayAvatarURL());
    message.channel.send(vEmbed);
    const vSanctionsChannel = message.guild.channels.cache.find(vChannelFound => vChannelFound.name === pDiscordBot.Config.Parameters[message.guild.id]["SanctionsChannel"]);
    if(vSanctionsChannel)
    {
      vSanctionsChannel.send(vEmbed);
    }
    message.delete();
  }
}

module.exports = new Warn();
