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
class OnGuildMemberSpeaking extends OnEvent{
  constructor() {
    super("guildMemberSpeaking");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const member = args[0];
    const speaking = args[1]
    await this.OnGuildMemberSpeaking(pDiscordBot, member, speaking);
  }  
  
  async mOnGuildMemberSpeaking(pDiscordBot, member, speaking) {
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
  }
}

module.exports = new OnGuildMemberSpeaking();