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
class ListReglements extends Command 
{
	constructor() 
	{
		super
		(
			"listreglements",
			["listreglement"],
			[
				"ADMINISTRATOR"
			],
			0,
			0,
			"listreglements",
			"List all autorole attributions",
			true,
			0
		);
  	}
	async mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args);
		let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor
			(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
			)
			.setTitle("Liste des Autoroles de règlements")
			.setColor(pDiscordBot.aConfig.Good)
			.setThumbnail(message.author.displayAvatarURL());
		const vAll = pDiscordBot.SQL.Database.Reglements.mAllReglements(message.guild.id);	
		if(vAll && vAll.length > 0)
		{	
			for(const vRecord of vAll)
			{
				const vChannel = message.guild.channels.cache.find(vChannelFound => vChannelFound.id === vRecord.ChannelID);
				let vMessage = await vChannel.messages.fetch(vRecord.MessageID);
				let vReaction = vMessage.reactions.cache.find(vReactionFound => vReactionFound.emoji.name === vRecord.Emoji);
				let vRole = await message.guild.roles.fetch(vRecord.RoleID);
				vEmbed.addFields
				(
					{name: `**ID:**`, value: `**${vRecord.rowid}**`, inline :false},
					{name: `channel:`, value: `${vChannel}`, inline : true},
					{name: `message:`, value: `${vMessage.url}`, inline : true},
					{name: `emoji => role:`, value: `${vReaction.emoji.name} => ${vRole}`, inline : true}
				);
			}
		}
		else
		{
			vEmbed.setDescription("*La liste est vide.*");
		}
		message.channel.send(vEmbed);
		message.delete();
	}
}

module.exports = new ListReglements();
