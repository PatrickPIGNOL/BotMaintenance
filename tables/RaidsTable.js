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

const Table = require("./Table.js")
class RaidsTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare(
			"CREATE TABLE IF NOT EXISTS Raids (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Message TEXT, Number INTEGER, Date DOUBLE, PRIMARY KEY (GuildID, MemberID, Message));"
		).run();
	}
	mDrop()
	{
		this.SQL.prepare(
			"DROP TABLE IF EXISTS Raids;"
		).run();
	}
	mAllRaids(pGuildID)
	{
		return this.SQL.prepare("SELECT rowid, * FROM Raids WHERE GuildID == ? ORDER BY Date DESC").all(pGuildID);
	}
	mGetRaids(pGuildID, pMemberID, pMessage)
	{
    	return this.SQL.prepare(
      		"SELECT * FROM Raids WHERE GuildID = ? AND MemberID = ? AND Message = ? ORDER BY Date DESC, Number DESC"
    	).get(pGuildID, pMemberID, pMessage);
	}
	mSetRaids(pValues)
	{
		this.SQL.prepare(
			"INSERT OR REPLACE INTO Raids (GuildID, GuildName, MemberID, MemberTag, Message, Number, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Message, @Number, @Date)"
		).run(pValues);
	}
	mDelRaids(pRowID)
	{
		this.SQL.prepare(
			"DELETE FROM Raids WHERE rowid == ?"
		).run(pRowID);
	}
}

module.exports = RaidsTable;