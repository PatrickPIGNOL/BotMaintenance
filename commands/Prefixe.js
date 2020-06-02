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
class Prefixe extends Command {
  constructor() {
    super(
      "prefixe",
      ["prefix"],
      [
        "ADMINISTRATOR"
      ],
      1,
      0,
      "prefixe <préfixe>",
      "Change le préfixe du bot.",
      true,
      0
    );
  }
  async mExecute(pDiscordBot, message, args) {
    super.mExecute(pDiscordBot, message, args);
    pDiscordBot.Config.Parameters[message.guild.id]["Prefix"] = args[0];
    let vParameter = {
      GuildID:`${message.guild.id}`, 
      GuildName:`${message.guild.name}`, 
      ParameterName:"Prefix", 
      ParameterValue: pDiscordBot.Config.Parameters[message.guild.id]["Prefix"]
    };
    pDiscordBot.SQL.setParameters.run(vParameter);
    const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
      .setAuthor(
        pDiscordBot.aClient.user.username,
        pDiscordBot.aClient.user.displayAvatarURL(),
        pDiscordBot.aConfig.URL
      )
      .setColor(pDiscordBot.aConfig.Good)
      .setDescription(`Le préfixe à bien été changé en "${pDiscordBot.Config.Parameters[message.guild.id]["Prefix"]}"`)
      .setThumbnail(message.author.displayAvatarURL());
    message.channel.send(vEmbed);
    message.delete();
  }
}

module.exports = new Prefixe();
