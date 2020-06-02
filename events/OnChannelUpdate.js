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
class OnChannelUpdate extends OnEvent {
  constructor() {
    super("channelUpdate");
  }
  
  async mExecute(pDiscordBot, ...args) {
    const oldChannel = args[0];
    const newChannel = args[1];
    await this.mOnChannelUpdate(pDiscordBot, oldChannel, newChannel);
  }
  
  async mOnChannelUpdate(pDiscordBot, oldChannel, newChannel) {
    if (oldChannel && newChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name} to ${newChannel.name}`
      );
    } else if (oldChannel) {
      console.log(
        `channelUpdate -> a channel is updated from ${oldChannel.name}`
      );
    } else if (newChannel) {
      console.log(
        `channelUpdate -> a channel is updated to ${newChannel.name}`
      );
    } else {
      console.log(
        `channelUpdate -> a channel is updated - e.g. name change, topic change`
      );
    }
  }
}

module.exports = new OnChannelUpdate();

