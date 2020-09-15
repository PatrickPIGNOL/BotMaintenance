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
class Autoroles extends Command
{
	constructor() 
	{
		super(
			"autoroles",
			["autorole"],
			[
				"ADMINISTRATOR"
			],
			1,
			0,
			0,
			0,
			"autoroles list\nautoroles [bot|user] <@Role>[<@Role>[...]]",
			"Permet de lister ou de mettre à jours les rôles donnés automatiquement aux nouveaux utilisateurs ou bots.",
			true,
			0
		);
	}
	async mExecute(pDiscordBot, message, args) 
	{
		super
		.mExecute(pDiscordBot, message, args)
		.then(() => 
		{
			const vCommand = args[0].toLowerCase();
			const vGuildID = message.guild.id;
			let vMessage = "";
			let vTitle = "**Autorôles**\n";
			if(vCommand === "list")
			{
				vTitle += "**Liste des Autorôles**"
				const vUserAutoroles = pDiscordBot.SQL.Database.Autoroles.mAllAutoroles(vGuildID, "user");
				const vBotAutoroles = pDiscordBot.SQL.Database.Autoroles.mAllAutoroles(vGuildID, "bot");
				vMessage += "**Roles attribués automatiquement aux nouveaux utilisateurs :**\n"
				if(vUserAutoroles.length > 0)
				{
					vUserAutoroles.forEach(vUserAutorole => {
					const vUserRole = message.guild.roles.cache.find(vRoleFound => vRoleFound.id === vUserAutorole.RoleID);
					vMessage += `\t-${vUserRole}\n`;
					});
				}
				else
				{
					vMessage += "\t*Aucun rôles...*\n";
				}
				vMessage += "\n**Rôles attribués automatiquement aux nouveaux bots :**\n"
				
				if(vBotAutoroles.length > 0)
				{
					vBotAutoroles.forEach(vBotAutorole => {
					const vUserRole = message.guild.roles.cache.find(vRoleFound => vRoleFound.id === vBotAutorole.RoleID);
					vMessage += `\t-${vUserRole}\n`;
					});
				}
				else
				{
					vMessage += "\t*Aucun rôles...*\n";
				}
			}
			else 
			{
				if(message.mentions.roles.length < 1)
				{
					const vError = new pDiscordBot.aDiscord.MessageEmbed()
					.setAuthor(
						pDiscordBot.aClient.user.username,
						pDiscordBot.aClient.user.displayAvatarURL(),
						pDiscordBot.aConfig.URL
					)
					.setTitle("Erreur ...")
					.setColor(pDiscordBot.aConfig.Bad)
					.setDescription("Vous devez mentionner au moins un rôle.")
					.setThumbnail(message.author.displayAvatarURL());
					message.reply(vError);
					message.delete();
					return; 
				}
				if(vCommand === "user")
				{
					vTitle += "**Modification des autorôles des nouveaux utilisateurs**"
					message.mentions.roles.forEach(vRoleFound => {              
					const vUserAutoroles = pDiscordBot.SQL.Database.Autoroles.mAllAutoroles(vGuildID, "user");
					let vRoleNotFound = true;
					if(vUserAutoroles)
					{
						vUserAutoroles.forEach(vBotAutorole => {
						if(vBotAutorole.RoleID === vRoleFound.id)
						{
							vRoleNotFound = false;
							const vAutorole = {
							GuildID: message.guild.id, 
							Type: "user",
							RoleID: vRoleFound.id
							};
							pDiscordBot.SQL.Database.Autoroles.mDelAutoroles(vAutorole);
							vMessage += `${vRoleFound} à été supprimé des rôles attribués aux nouveaux utilisateurs.\n`;
						}
						});
					}
					if(vRoleNotFound)
					{
						const vAutorole = {
						GuildID: message.guild.id, 
						GuildName: message.guild.name, 
						Type: "user",
						RoleID: vRoleFound.id,
						RoleName: vRoleFound.name
						};
						pDiscordBot.SQL.Database.Autoroles.mSetAutoroles(vAutorole);
						vMessage += `${vRoleFound} à été ajouté aux rôles attribués aux nouveaux utilisateurs.\n`;
					}
					});
				}
				else if(vCommand === "bot")
				{
					vTitle += "**Modification des autorôles des nouveaux bot**"
					message.mentions.roles.forEach(vRoleFound => {              
					const vBotAutoroles = pDiscordBot.SQL.Database.Autoroles.mAllAutoroles(vGuildID, "bot");
					let vRoleNotFound = true;
					if(vBotAutoroles)
					{
						vBotAutoroles.forEach(vBotAutorole => {
						if(vBotAutorole.RoleID === vRoleFound.id)
						{
							vRoleNotFound = false;
							const vAutorole = {
							GuildID: message.guild.id, 
							Type: "bot",
							RoleID: vRoleFound.id
							};
							pDiscordBot.SQL.Database.Autoroles.mDelAutoroles(vAutorole);
							vMessage += `${vRoleFound} à été supprimé des rôles attribués aux nouveaux bots.\n`;
						}
						});
					}
					
					if(vRoleNotFound)
					{                
						const vAutorole = {
						GuildID: message.guild.id, 
						GuildName: message.guild.name, 
						Type: "bot",
						RoleID: vRoleFound.id,
						RoleName: vRoleFound.name
						};
						pDiscordBot.SQL.Database.Autoroles.mSetAutoroles(vAutorole);
						vMessage += `${vRoleFound} à été ajouté aux rôles attribués aux nouveaux bots.\n`;
					}
					});
				}
				else
				{
					const vError = new pDiscordBot.aDiscord.MessageEmbed()
					.setAuthor(
						pDiscordBot.aClient.user.username,
						pDiscordBot.aClient.user.displayAvatarURL(),
						pDiscordBot.aConfig.URL
					)
					.setTitle("Erreur ...")
					.setColor(pDiscordBot.aConfig.Bad)
					.setDescription("Les commandes ne peuvent être que list, user ou bot.")
					.setThumbnail(message.author.displayAvatarURL());
					message.reply(vError);
					message.delete();
					return; 
				}
			}
		
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
			.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
			)
			.setTitle(vTitle)
			.setColor(pDiscordBot.aConfig.Good)
			.setDescription(vMessage)
			.setThumbnail(message.author.displayAvatarURL());
			message.channel.send(vEmbed);
			message.delete();
		})
		.catch(e => {
			console.error(e);
			message.reply(e);
			message.delete();
			return;
		});
	}
}

module.exports = new Autoroles();
