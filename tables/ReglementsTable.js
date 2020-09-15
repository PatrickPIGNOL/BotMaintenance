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

const Table = require("./Table.js");
class ReglementTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare(
			"CREATE TABLE IF NOT EXISTS Reglements (GuildID TEXT, ChannelID TEXT, MessageID TEXT, Emoji TEXT, RoleID TEXT, PRIMARY KEY (GuildID, ChannelID, MessageID, Emoji));"
		).run();
	}
	mDrop()
	{
		this.SQL.prepare(
			"DROP TABLE IF EXISTS Reglements;"
		).run();
	}
	mAllReglements(pGuildID)
	{
		return this.SQL.prepare(
			"SELECT rowid, * FROM Reglements WHERE GuildID = ?"
		).all(pGuildID);
	}
	mGetReglements(pGuildID, pMessageID)
	{
		return this.SQL.prepare(
			"SELECT rowid, * FROM Reglements WHERE GuildID = ? AND MessageID = ?"
		).all(pGuildID, pMessageID);
	}
	mSetReglements(pValues)
	{
		this.SQL.prepare(
			"INSERT OR REPLACE INTO Reglements (GuildID, ChannelID, MessageID, Emoji, RoleID) VALUES (@GuildID, @ChannelID, @MessageID, @Emoji, @RoleID)"
		).run(pValues);
	}
	mDelReglements(pRowID)
	{
		this.SQL.prepare(
			"DELETE FROM Reglements WHERE rowid = ?"
		).run(pRowID);
	}
}

module.exports = ReglementTable;