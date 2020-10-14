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
class OnGuildMemberRemove extends OnEvent 
{
<<<<<<< HEAD
<<<<<<< HEAD
	constructor() 
	{
		super("guildMemberRemove");
	}

	async mExecute(pDiscordBot, ...args) 
	{
		const member = args[0];
		await this.mOnGuildMemberRemove(pDiscordBot, member);
	}
  
	mOnGuildMemberRemove(pDiscordBot, member) 
  	{
    	const vUser = member.user;
		const vGuild = member.guild;
		const vCache = vGuild.channels.cache;

		const vByeChannelParametter = pDiscordBot.SQL.Database.Parameters.mParameter(member.guild.id, "ByeChannel");
		
		const vByeChannel = vCache.find(
			vChannelFound => vChannelFound.id === vByeChannelParametter.ParameterValue 
		);
		if (!vByeChannel) {
		console.log(`channel "${pDiscordBot.Config.Parameters[member.guild.id]["ByeChannel"]}" not found`);
		return;
		}
		const vMessageParameter = pDiscordBot.SQL.Database.Parameters.mParameter(member.guild.id, "ByeMessage");
		let vMessage = vMessageParameter.ParameterValue 
		while(vMessage.indexOf("${member}") > -1)
		{
		vMessage = vMessage.replace('${member}', `${member}`);
		}
		const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
		.setAuthor(
			vGuild.owner.user.username,
			vGuild.owner.user.displayAvatarURL()
		)
		.setColor(pDiscordBot.aConfig.Bad)
		.setDescription(vMessage)
		.setThumbnail(vUser.displayAvatarURL());
		vByeChannel.send(vEmbed);
	}
=======
    constructor() 
    {
       super("guildMemberRemove");
    }

    async mExecute(pDiscordBot, ...args) 
    {
        const member = args[0];
        await this.mOnGuildMemberRemove(pDiscordBot, member);
    }
  
    mOnGuildMemberRemove(pDiscordBot, member) 
    {
=======
    constructor() 
    {
       super("guildMemberRemove");
    }

    async mExecute(pDiscordBot, ...args) 
    {
        const member = args[0];
        await this.mOnGuildMemberRemove(pDiscordBot, member);
    }
  
    mOnGuildMemberRemove(pDiscordBot, member) 
    {
>>>>>>> origin/master
        const vUser = member.user;
        const vGuild = member.guild;
        const vCache = vGuild.channels.cache;

        const vByeChannelParametter = pDiscordBot.SQL.Database.Parameters.mParameter(member.guild.id, "ByeChannel");
        
        const vByeChannel = vCache.find(
          vChannelFound => vChannelFound.id === vByeChannelParametter.ParameterValue 
        );
        if (!vByeChannel) {
        console.log(`channel "${pDiscordBot.Config.Parameters[member.guild.id]["ByeChannel"]}" not found`);
        return;
        }
        const vMessageParameter = pDiscordBot.SQL.Database.Parameters.mParameter(member.guild.id, "ByeMessage");
        let vMessage = vMessageParameter.ParameterValue 
        while(vMessage.indexOf("${member}") > -1)
        {
        vMessage = vMessage.replace('${member}', `${member}`);
        }
        const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
        .setAuthor(
          vGuild.owner.user.username,
          vGuild.owner.user.displayAvatarURL()
        )
        .setColor(pDiscordBot.aConfig.Bad)
        .setDescription(vMessage)
        .setThumbnail(vUser.displayAvatarURL());
        vByeChannel.send(vEmbed);
    }
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
}

module.exports = new OnGuildMemberRemove();
