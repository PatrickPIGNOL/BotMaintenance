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
class DelReglement extends Command 
{
	constructor() 
	{
		super
		(
			"delreglement",
			["delreglements"],
			[
				"ADMINISTRATOR"
			],
			1,
			0,
			"delreglement <@IDAutoroleRèglement>",
			"supprime les autoroles règlements par ID disponibles dans listreglements",
			true,
			0
		);
  	}
	
	async mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args).then(() =>
		{
			const vIDReglement = args[0];
			pDiscordBot.SQL.Database.Reglements.mDelReglements(vIDReglement);
			const vEmbed = new pDiscordBot.Discord.MessageEmbed()
				.setColor(pDiscordBot.Config.Good)
				.setAuthor
				(
					pDiscordBot.Client.user.username,
					pDiscordBot.Client.user.displayAvatarURL(),
					pDiscordBot.Config.URL
				)
				.setTitle("Suppréssion de l'Autorole Règlement")
				.setDescription(`L'Autorole avec l'id ${vIDReglement} à été supprimé si il existais.`);
			message.channel.send(vEmbed);
			message.delete();
		}).catch(console.error);
	}
}

module.exports = new DelReglement();
