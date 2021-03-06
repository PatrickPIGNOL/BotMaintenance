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
const OnEvent = require("../OnEvent.js");
class OnMessage extends OnEvent{
	constructor()
	{
		super("message");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const message = args[0];
		await this.mOnMessage(pDiscordBot, message);
	}

	async mOnMessage(pDiscordBot, message) 
	{
		console.log(
			"new message <" +
			message +
			"> of @" +
			message.author.tag +
			"(" +
			message.author.id +
			") in #" +
			message.channel.name +
			' : "' +
			message.content +
			'";\n'
		);    
		
		if(message.guild)
		{
			if(message.mentions.has(pDiscordBot.Client.user))
			{
				const vEmbed = new pDiscordBot.Discord.MessageEmbed()
					.setAuthor(
						pDiscordBot.aClient.user.username,
						pDiscordBot.aClient.user.displayAvatarURL(),
						pDiscordBot.aConfig.URL
					)
					.setColor(pDiscordBot.aConfig.Good)
					.setTitle(`Bonjour`)
					.setDescription(`Bonjour à toi ${message.author}.\nTu ne sais pas comment m'appeler ? C'est pourtant simple...\nMon préfixe est : **${pDiscordBot.Config.Parameters[message.guild.id]["Prefix"]}**\nPour avoir la liste des commandes disponibles il faut donc que tu tape "**${pDiscordBot.Config.Parameters[message.guild.id]["Prefix"]}aide**".\nVoila c'est pas plus compliqué que ça...`)
					.setThumbnail(message.author.displayAvatarURL());
				message.reply(vEmbed);
				message.delete();
				return;
			}

			if 
			(
				!message.content.startsWith(pDiscordBot.Config.Parameters[message.guild.id]["Prefix"])
				&&
				!message.content.startsWith(pDiscordBot.Config.Prefix)
			) 
			{
				this.mRaids(pDiscordBot, message);      
				return;
			}
			if(pDiscordBot.Config.Parameters[message.guild.id]["Prefix"])
			{
				const vArgs = message.content
					.slice(pDiscordBot.Config.Parameters[message.guild.id]["Prefix"].length)
					.split(/ +/);
				const vCommandName = vArgs.shift().toLowerCase();
				
				const vCommand = pDiscordBot.aClient.commands.get(vCommandName) || pDiscordBot.aClient.commands.find(
					vCommandFound =>
					vCommandFound.Aliases &&
					vCommandFound.Aliases.includes(vCommandName)		
				);	

				if (vCommand) 
				{
					vCommand.mExecute(pDiscordBot, message, vArgs);
				}
			}
			else
			{
				const vArgs = message.content
					.slice(pDiscordBot.Config.Prefix.length)
					.split(/ +/);
				const vCommandName = vArgs.shift().toLowerCase();
				
				const vCommand = pDiscordBot.aClient.commands.get(vCommandName) || pDiscordBot.aClient.commands.find(
					vCommandFound =>
					vCommandFound.Aliases &&
					vCommandFound.Aliases.includes(vCommandName)			
				);

				if (vCommand) 
				{
					vCommand.mExecute(pDiscordBot, message, vArgs);
				}				
			}
		}
		else
		{
			if (!message.content.startsWith(pDiscordBot.Config.Prefix)) 
			{
				this.mRaids(pDiscordBot, message);      
				return;
			}
			const vArgs = message.content
				.slice(pDiscordBot.aConfig.Prefix.length)
				.split(/ +/);
			const vCommandName = vArgs.shift().toLowerCase();

			const vCommand = pDiscordBot.aClient.commands.get(vCommandName) || pDiscordBot.aClient.commands.find(
				vCommandFound =>
				vCommandFound.Aliases &&
				vCommandFound.Aliases.includes(vCommandName)
			);

			if (vCommand) 
			{
				vCommand.mExecute(pDiscordBot, message, vArgs);
			}
		}
  	}
  
	mRaids(pDiscordBot, message) 
	{
		const vDelay = 1200000;
		const vMaxMessage = 4;
		if(message.guild)
		{      
			let vRaid = pDiscordBot.SQL.Database.Raids.mGetRaids(message.guild.id, message.author.id, message.content);
			if(!vRaid)
			{
				vRaid = {
				GuildID : message.guild.id,
				GuildName : message.guild.name,
				MemberID : message.author.id,
				MemberTag : message.author.tag,
				Message : message.content,
				Number : 0, 
				Date : Date.now()
				}
			}
			if(Date.now() - vRaid.Date < vDelay)
			{          
				vRaid.Number++;
			}        
			else
			{
				vRaid.Number = 1;
			}
			vRaid.Date = Date.now();
			pDiscordBot.SQL.Database.Raids.mSetRaids(vRaid); 
			if(vRaid.Number > vMaxMessage)
			{ 
				let vMember;
				if(message.member)
				{
					vMember = message.member
				}
				else
				{
					vMember = message.guild.members.fetch(message.author);
				}
				if(message.author.id !== message.guild.owner.user.id)
				{
					if(!vMember.hasPermissions("ADMINISTRATOR"))
					{
						message.guild.members.ban(message.author , { days: 1, reason: "Auto-Ban : Spam-Raider détecté"});
					}
				}
			}
			const vRaids = pDiscordBot.SQL.Database.Raids.mAllRaids(message.guild.id);
			vRaids.forEach(vData => 
			{        
				if(Date.now() - vData.Date > vDelay)
				{
					pDiscordBot.SQL.Database.Raids.mDelRaids(vData.rowid);
				}
			});
		}
	}
}

module.exports = new OnMessage();
