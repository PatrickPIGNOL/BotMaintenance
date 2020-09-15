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
class Aide extends Command 
{
	constructor() 
	{
		super(
			"aide",
			["help"],
			[],
			0,
			0,
			"help",
			"Show all bot's commands help.",
			true,
			5
		);
	}
	mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args);
		let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
		.setColor(pDiscordBot.aConfig.Good)
		.setTitle(`**${pDiscordBot.aClient.user.username}** Panneau de commandes`)
		.setAuthor(
			`${pDiscordBot.aClient.user.username}`,
			`${pDiscordBot.aClient.user.displayAvatarURL()}`,
			pDiscordBot.aConfig.URL
		)
		.setDescription("Maintenance...\n\n__**Liste des Commandes :**__")
		.setThumbnail(`${pDiscordBot.aClient.user.displayAvatarURL()}`);
		for (const vCommand of pDiscordBot.Client.commands.array())
		{
			if(vCommand.mHavePermission(pDiscordBot, message))
			{
				let vName = `**${vCommand.Name}**`
				if(vCommand.Aliases.length)
				{
					vName += ` Aliases : `;
					const vAliases = vCommand.Aliases;
					for(const vAlias of vAliases)
					{         
						vName += `${vAlias} `;
					}
				}
				vEmbed.addField(`${vName}`, `Usage : ${vCommand.Usage}\n${vCommand.Description}`, false);
			}
		}
		message.author.send(vEmbed);
		message.delete();
	}
}

module.exports = new Aide();