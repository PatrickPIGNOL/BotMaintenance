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
class MuteRole extends Command {
	constructor() 
	{
		super(
			"muterole",
			["muteroles"],
			[
				"ADMINISTRATOR"
			],
			1,
			0,
			"muterole @Role",
			"Crée ou change le muterole.",
			true,
			0
		);
	}
	async mExecute(pDiscordBot, message, args) 
	{ 
		super.mExecute(pDiscordBot, message, args).then(()=>
		{
			console.log("muterole ok.");
			if(message.mentions.roles.size < 1)
			{
				const vErrorEmbed = new pDiscordBot.Discord.MessageEmbed()
					.setColor(pDiscordBot.Config.Bad)
					.setAuthor
					(
						pDiscordBot.Client.user.username,
						pDiscordBot.Client.user.displayAvatarURL(),
						pDiscordBot.Config.URL
					)
					.setTitle("ERREUR...")
					.setDescription("Vous devez mentionner un rôle.");
				message.reply(vErrorEmbed);
			}
			const vRole = message.mentions.roles.first();
			const vValues = {
				GuildID: message.guild.id, 
				GuildName: message.guild.name, 
				ParameterName: "MuteRoleID", 
				ParameterValue: vRole.id
			}
			pDiscordBot.SQL.Database.Parameters.mSetParameters(vValues);
			const vEmbed = new pDiscordBot.Discord.MessageEmbed()
				.setColor(pDiscordBot.Config.Good)
				.setTitle("MuteRole")
				.setAuthor
				(
					pDiscordBot.Client.user.username,
					pDiscordBot.Client.user.displayAvatarURL(),
					pDiscordBot.Config.URL
				)
				.setDescription(`Le role ${vRole} à bien été désigné come MuteRole.`);
			message.channel.send(vEmbed);
			message.delete();
		})
		.catch(e => 
		{
			console.log(e);
			message.channel.send(e);
			message.delete();
			return;
		});
	}
}

module.exports = new MuteRole();