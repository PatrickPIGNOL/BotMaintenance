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
class OnMessageReactionAdd extends OnEvent
{
	constructor() 
	{
		super("messageReactionAdd");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const messageReaction = args[0]; 
		const user = args[1];
		await this.mOnMessageReactionAdd(pDiscordBot, messageReaction, user);
	}

	async mOnMessageReactionAdd(pDiscordBot, messageReaction, user) 
	{
		console.log(`a reaction is added to a message`);
		/*
		if (messageReaction.partial) 
		{
			// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
			try 
			{
				await reaction.fetch();
			}
			catch (error) 
			{
				console.log('Something went wrong when fetching the message: ', error);
				// Return as `reaction.message.author` may be undefined/null
				return;
			}
		}
		console.log(`${messageReaction.emoji.name} reaction is added to a message to ${messageReaction.message.url}`);
		const vGuild = messageReaction.message.guild;	
		const vReglements = pDiscordBot.SQL.Database.Reglements.mGetReglements(vGuild.id, messageReaction.message.id);
		for(const vReglement of vReglements)
		{
			if(messageReaction.emoji.name === vReglement.Emoji)
			{
				const vRole = await vGuild.roles.fetch(vReglement.RoleID);		
				const vMember = await vGuild.members.fetch(user.id);	
				vMember.roles.add(vRole);
			}
		}
		*/
	}
}

module.exports = new OnMessageReactionAdd();

