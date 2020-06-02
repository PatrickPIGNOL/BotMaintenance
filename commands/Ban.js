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
class Ban extends Command {
  constructor() {
    super(
      "ban",
      [],
      [
        "ADMINISTRATOR"
      ],
      2,
      0,
      "ban <IDUtilisateur> <Raison>",
      "Ban un <IDUtilisateur> pour la raison <Raison>.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    const vUserID = args.shift();
    const vReason = args.join(" ");
    let vUser;
    message.guild.members.ban(vUserID, { days: 0, reason: vReason})
      .then(vUserFound => {
        vUser = vUserFound;
      })
      .catch((error) => {
        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
          .setAuthor(
            pDiscordBot.aClient.user.username,
            pDiscordBot.aClient.user.displayAvatarURL(),
            pDiscordBot.aConfig.URL
          )
          .setTitle("ERREUR ...")
          .setColor(pDiscordBot.aConfig.Bad)
          .setDescription(`L'utilisateur avec l'ID : "${vUserID}" n'existe pas ou vous n'avez pas les droits pour le bannir.`)
          .setThumbnail(message.author.displayAvatarURL());
        message.channel.send({
          "content": `${message.guild.owner}`,
          "embed": vEmbed
        });
        message.delete();
        return;
      });
    if(!vUser)
    {
      vUser = pDiscordBot.Client.users.resolveID(vUserID);
    }
    const vEmbed = new pDiscordBot.Discord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setTitle("BANNISSEMENT")
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(`L'utilisateur ${vUser || vUserID} à bien été bannis pour la raison : "${vReason}"`)
      .setThumbnail(message.author.displayAvatarURL());
    message.channel.send({
      "content": `${message.guild.owner}`,
      "embed": vEmbed
    });
    message.delete();
  }
}

module.exports = new Ban();
