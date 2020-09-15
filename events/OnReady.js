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
class OnReady extends OnEvent {
	constructor() {
		super("ready");
	}

	async mExecute(pDiscordBot, ...args) {
		await this.mOnReady(pDiscordBot);
	}

	async mOnReady(pDiscordBot) 
	{
		console.log("OnReady called")
		pDiscordBot.aClient.user.setStatus("online");
		pDiscordBot.aClient.user.setActivity("Discord Gestion Serveur Bot", 
		{
			type: 1
		});

		console.log(`${pDiscordBot.aClient.user.tag} - I'm online ...`);

		const vGuildsCount = pDiscordBot.aClient.guilds.cache.size;
		let vMembersCount = 0;
		let vChannelsCount = 0;
		pDiscordBot.aClient.guilds.cache.forEach(vGuildFound => 
		{
			vChannelsCount += vGuildFound.channels.cache.size;
			vMembersCount += vGuildFound.members.cache.size;
		});
		
		console.log(`${vMembersCount} members, in ${vChannelsCount} channels of ${vGuildsCount} guilds.`);
		
		pDiscordBot.Config.Parameters = new Array();
		pDiscordBot.Client.guilds.cache.forEach(vGuildFound => 
		{
			pDiscordBot.Config.Parameters[vGuildFound.id] = new Array();
			const vParameters = pDiscordBot.SQL.Database.Parameters.mAllParameters(vGuildFound.id);
			if(vParameters)
			{
				vParameters.forEach(vParameter => 
				{
					pDiscordBot.Config.Parameters[vGuildFound.id][vParameter.ParameterName] = vParameter.ParameterValue;
				});
			}
		});

		
		pDiscordBot.Client.guilds.cache.forEach(async vGuildFound => 
		{
			const vReglements = pDiscordBot.SQL.Database.Reglements.mAllReglements(vGuildFound.id);
			for(const vReglement of vReglements)
			{
				const vChannel = await vGuildFound.channels.resolve(vReglement.ChannelID);
				const vMessage = await vChannel.messages.fetch(vReglement.MessageID);
				const vReaction = vMessage.reactions.cache.find(vReactionFound => vReactionFound.emoji.name === vReglement.Emoji);
				const vRole = await vGuildFound.roles.fetch(vReglement.RoleID);
				const vFilter = (reaction, user) => reaction.emoji.name === vReglement.Emoji;
				const vReactionCollector = vMessage.createReactionCollector(vFilter);
				vReactionCollector.on('collect', async (messageReaction, user) => 
				{
					console.log(`Collected ${messageReaction.emoji.name}`)
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
				});
			}
		});
		
	}
}

module.exports = new OnReady();
