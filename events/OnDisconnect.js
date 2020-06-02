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
class OnDisconnect extends OnEvent {
  constructor() {
    super("disconnect");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const event = args[0];
    await this.mOnDisconnect(pDiscordBot, event);
  }
  
  async mOnDisconnect(pDiscordBot, event) {
    console.log(
      `The WebSocket has closed and will no longer attempt to reconnect`
    );
  }
}

module.exports = new OnDisconnect();