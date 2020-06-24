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

  async mOnReady(pDiscordBot) {
    pDiscordBot.aClient.user.setStatus("online");
    pDiscordBot.aClient.user.setActivity("écrire son code source ...", {
      type: 1
    });

    console.log(`${pDiscordBot.aClient.user.tag} - I'm online ...`);

    const vGuildsCount = pDiscordBot.aClient.guilds.cache.size;
    let vMembersCount = 0;
    let vChannelsCount = 0;
    pDiscordBot.aClient.guilds.cache.forEach(vGuildFound => {
      vChannelsCount += vGuildFound.channels.cache.size;
      vMembersCount += vGuildFound.members.cache.size;
    });
    console.log(
      `${vMembersCount} members, in ${vChannelsCount} channels of ${vGuildsCount} guilds.`
    );
    pDiscordBot.SQL.prepare(
      "CREATE TABLE IF NOT EXISTS Warns (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, ModeratorID TEXT, ModeratorTag TEXT, Date TEXT, Reason TEXT);"
    ).run();
    pDiscordBot.SQL.prepare(
      "CREATE TABLE IF NOT EXISTS Raids (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Message TEXT, Number INTEGER, Date DOUBLE, PRIMARY KEY (GuildID, MemberID, Message));"
    ).run();
    pDiscordBot.SQL.prepare(
      "CREATE TABLE IF NOT EXISTS Parameters (GuildID TEXT, GuildName TEXT, ParameterName TEXT, ParameterValue TEXT, PRIMARY KEY(GuildID, ParameterName));"
    ).run();
    pDiscordBot.SQL.prepare(
      "CREATE TABLE IF NOT EXISTS Autoroles (GuildID TEXT, GuildName TEXT, Type TEXT, RoleID TEXT, RoleName TEXT, PRIMARY KEY (GuildID, Type, RoleID));"
    ).run();
    pDiscordBot.SQL.getAutoroles = pDiscordBot.SQL.prepare(
      "SELECT * FROM autoroles WHERE GuildID = ? AND Type = ?"
    );
    pDiscordBot.SQL.setAutoroles = pDiscordBot.SQL.prepare(
      "INSERT OR REPLACE INTO autoroles (GuildID, GuildName, Type, RoleID, RoleName) VALUES (@GuildID, @GuildName, @Type, @RoleID, @RoleName)"
    );
    pDiscordBot.SQL.delAutoroles = pDiscordBot.SQL.prepare(
      "DELETE FROM autoroles WHERE GuildID = @GuildID AND Type = @Type AND RoleID = @RoleID"
    );
    pDiscordBot.SQL.getWarns = pDiscordBot.SQL.prepare(
      "SELECT rowid, * FROM Warns WHERE GuildID = ? ORDER BY MemberTag ASC, Date DESC"
    );
    pDiscordBot.SQL.setWarns = pDiscordBot.SQL.prepare(
      "INSERT OR REPLACE INTO Warns (GuildID, GuildName, MemberID, MemberTag, ModeratorID, ModeratorTag, Date, Reason) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @ModeratorID, @ModeratorTag, @Date, @Reason)"
    );
    pDiscordBot.SQL.delWarns = pDiscordBot.SQL.prepare(
      "Delete FROM Warns WHERE rowid = ?"
    );
    pDiscordBot.SQL.getRaids = pDiscordBot.SQL.prepare(
      "SELECT * FROM Raids WHERE GuildID = ? AND MemberID = ? AND Message = ? ORDER BY Date DESC, Number DESC"
    );
    pDiscordBot.SQL.setRaids = pDiscordBot.SQL.prepare(
      "INSERT OR REPLACE INTO Raids (GuildID, GuildName, MemberID, MemberTag, Message, Number, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Message, @Number, @Date)"
    );
    pDiscordBot.SQL.getParameters = pDiscordBot.SQL.prepare(
      "SELECT * FROM Parameters WHERE GuildID = ?"
    );
    pDiscordBot.SQL.setParameters = pDiscordBot.SQL.prepare(
      "INSERT OR REPLACE INTO Parameters (GuildID, GuildName, ParameterName, ParameterValue) VALUES (@GuildID, @GuildName, @ParameterName, @ParameterValue)"
    );
    pDiscordBot.Config.Parameters = new Array();
    pDiscordBot.Client.guilds.cache.forEach(vGuildFound => {
      pDiscordBot.Config.Parameters[vGuildFound.id] = new Array();
      const vParameters = pDiscordBot.SQL.getParameters.all(vGuildFound.id);
      vParameters.forEach(vParameter => {
        pDiscordBot.Config.Parameters[vGuildFound.id][
          vParameter.ParameterName
        ] = vParameter.ParameterValue;
      });
    });
  }
}

module.exports = new OnReady();
