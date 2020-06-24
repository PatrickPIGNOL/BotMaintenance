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
class OnGuildMemberAdd extends OnEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async mExecute(pDiscordBot, ...args) {
    const member = args[0];
    await this.mOnGuildMemberAdd(pDiscordBot, member);
  }

  async mOnGuildMemberAdd(pDiscordBot, member) {
    if (member.user.bot) {
      const vBotAutoroles = pDiscordBot
        .mSQL()
        .getAutoroles.all(member.guild.id, "bot");
      if (vBotAutoroles) {
        vBotAutoroles.forEach(vBotAutorole => {
          const vBotRole = member.guild.roles.cache.find(
            vRoleFound => vRoleFound.id === vBotAutorole.RoleID
          );
          if(vBotRole)
          {
            member.roles.add(vBotRole, "autorole onGuildMemberAdd");
          }
        });
      }
    } else {
      const vUserAutoroles = pDiscordBot
        .mSQL()
        .getAutoroles.all(member.guild.id, "bot");
      if (vUserAutoroles) {
        vUserAutoroles.forEach(vUserAutorole => {
          const vUserRole = member.guild.roles.cache.find(
            vRoleFound => vRoleFound.id === vUserAutorole.RoleID
          );
          if(vUserRole)
          {
            member.roles.add(vUserRole, "autorole onGuildMemberAdd");
          }
        });
      }
    }
    console.log(`a new member entered the guild : ${member.tag}`);
  }
}

module.exports = new OnGuildMemberAdd();
