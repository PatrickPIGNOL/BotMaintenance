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
class AddReglement extends Command 
{
	constructor() 
	{
		super
		(
			"addreglement",
			["addreglements"],
			[
				"ADMINISTRATOR"
			],
			3,
			0,
			"addreglement <IDMessage> <Emoji> <@IDRole>",
			"add new autorole attributions to a given message reaction",
			true,
			0
		);
  	}
	async mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args).then(async ()=>
		{
			const vMessageID = args[0];
			const vEmoji = args[1];
			const vRole = message.mentions.roles.first();
			console.log(`vMessageID : ${vMessageID}`);
			console.log(`vEmoji : ${vEmoji}`);
			console.log(`vRole : ${vRole}`);
			if(!vRole)
			{
				message.reply(`Vous devez mentionner un role`);
				message.delete();
				return;
			}
			
			const vChannel = message.channel;
			let vMessage = await vChannel.messages.fetch(vMessageID);
			if(!vMessage)
			{
				message.reply(`Le message ${vMessageID} n'existe pas dans le cannal ${vChannel}.`);
				message.delete();
				return;
			}
			console.log(`Message <${vMessage.id}> => "${vMessage.content}".`);
			let vReactionEmoji = vMessage.reactions.cache.find(vReactionFound => vReactionFound.emoji.name === vEmoji);
			if(!vReactionEmoji)
			{
				vMessage.react(vEmoji);
				vReactionEmoji = vMessage.reactions.cache.find(vReactionFound => vReactionFound.emoji.name === vEmoji);
				if(!vReactionEmoji)
				{
					message.reply(`l'emoji n'existe pas et/ou ne peut être défini sur le message.`);
					message.delete();
					return;
				}
			}
			const vValues = 
			{
				GuildID		:	message.guild.id,
				ChannelID	:	message.channel.id,
				MessageID	:	vMessage.id,
				Emoji		:	vReactionEmoji.emoji.name, 
				RoleID		:	vRole.id
			}
			pDiscordBot.SQL.Database.Reglements.mSetReglements(vValues);
			let vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor
				(
					pDiscordBot.aClient.user.username,
					pDiscordBot.aClient.user.displayAvatarURL(),
					pDiscordBot.aConfig.URL
				)
				.setTitle("Ajout d'un Autorole de règlement")
				.setColor(pDiscordBot.aConfig.Good)
				.setThumbnail(message.author.displayAvatarURL());
			vEmbed.setDescription(`Le role ${vRole} sera assigné en cas de réactions sur le message ${vMessage.url} du cannal ${message.channel} avec l'émoji : ${vReactionEmoji.emoji.name}`);
			message.channel.send(vEmbed);
			message.delete();
		}).catch(console.error);
			
	}
}

module.exports = new AddReglement();
