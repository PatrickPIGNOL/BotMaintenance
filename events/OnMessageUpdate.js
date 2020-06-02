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
class OnMessageUpdate extends OnEvent {
  constructor() {
    super("messageUpdate");
  }

  async mExecute(pDiscordBot, ...args) {
    const oldMessage = args[0];
    const newMessage = args[1];
    await this.mOnMessageUpdate(pDiscordBot, oldMessage, newMessage);
  }

  async mOnMessageUpdate(pDiscordBot, oldMessage, newMessage) {
    if(oldMessage)
    {
      console.log(`${oldMessage.content}`);      
    }
    if(newMessage)
    {
      console.log(`${newMessage.contents} :`);      
    }
  }
}

module.exports = new OnMessageUpdate();