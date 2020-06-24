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
/* Available Permissions :
"ADMINISTRATOR", // (implicitly has all permissions, and bypasses all channel overwrites)
"CREATE_INSTANT_INVITE", // (create invitations to the guild)
"KICK_MEMBERS",
"BAN_MEMBERS",
"MANAGE_CHANNELS",// (edit and reorder channels)
"MANAGE_GUILD",// (edit the guild information, region, etc.)
"ADD_REACTIONS",// (add new reactions to messages)
"VIEW_AUDIT_LOG",
"PRIORITY_SPEAKER",
"STREAM",
"VIEW_CHANNEL",
"SEND_MESSAGES",
"SEND_TTS_MESSAGES",
"MANAGE_MESSAGES",// (delete messages and reactions)
"EMBED_LINKS",// (links posted will have a preview embedded)
"ATTACH_FILES",
"READ_MESSAGE_HISTORY",// (view messages that were posted prior to opening Discord)
"MENTION_EVERYONE",
"USE_EXTERNAL_EMOJIS",// (use emojis from different guilds)
"VIEW_GUILD_INSIGHTS",
"CONNECT",// (connect to a voice channel)
"SPEAK",// (speak in a voice channel)
"MUTE_MEMBERS",// (mute members across all voice channels)
"DEAFEN_MEMBERS",// (deafen members across all voice channels)
"MOVE_MEMBERS",// (move members between voice channels)
"USE_VAD",// (use voice activity detection)
"CHANGE_NICKNAME",
"MANAGE_NICKNAMES",// (change other members' nicknames)
"MANAGE_ROLES",
"MANAGE_WEBHOOKS",
"MANAGE_EMOJIS"
*/
class Command {
  constructor(
    pName,
    pAliases,
    pPermissions,
    pArgs,
    pMentions,
    pUsage,
    pDescription,
    pGuildOnly,
    pCooldown
  ) {
    this.aName = pName;
    this.aAliases = pAliases;
    this.aPermissions = pPermissions;
    this.aArgs = pArgs;
    this.aMentions = pMentions;
    this.aUsage = pUsage;
    this.aDescription = pDescription;
    this.aGuildOnly = pGuildOnly;
    this.aCooldown = pCooldown;
  }
  get Name() {
    return this.aName;
  }
  get Aliases() {
    return this.aAliases;
  }
  get Permissions() {
    return this.aPermissions;
  }
  mHavePermission(pDiscordBot, pMessage) 
  {
    let vHavePermission = true;
    if (this.aPermissions && this.aPermissions.length) 
    {
      vHavePermission = false;
      const vMemberAuthor = pMessage.member;
      if (vMemberAuthor) 
      {
        for(const vPermissionFound of this.aPermissions) 
        {
          if (vMemberAuthor.hasPermission(vPermissionFound)) 
          {
            vHavePermission = true;            
            return vHavePermission;
          }
        }
      }
      else 
      {
        console.log("Error : no author for this message.");
        vHavePermission = false;
        return vHavePermission;
      }
    }
    return vHavePermission;
  }
  get Args() 
  {
    return this.aArgs;
  }
  get Mentions() {
    return this.aMentions;
  }
  get Usage() {
    return this.aUsage;
  }
  get Description() {
    return this.aDescription;
  }
  get GuildOnly() {
    return this.aGuildOnly();
  }
  get Cooldown() {
    return this.aCooldown();
  }
  async mExecute(pDiscordBot, message, args) {
    if (this.aGuildOnly && message.channel.type !== "text") {
      throw new Error("I cannot execute this command in DM channel !"); 
    }
    if (!this.mHavePermission(pDiscordBot, message)) {
      throw new Error("You don't have rights to execute this command."); 
    }
    if (this.aArgs > 0 && args.length < this.aArgs) {
      throw new Error(`You must provide at least ${this.aArgs} parameters !`); 
    }
    if (this.aMentions > message.mentions.members.size) {      
      throw new Error(`You must mention at least ${this.aMentions} member(s).`); 
    }
  }
}

module.exports = Command; 
