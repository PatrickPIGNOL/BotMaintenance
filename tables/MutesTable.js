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
class MutesTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare
		(
			"CREATE TABLE IF NOT EXISTS Mutes (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, Date TEXT, PRIMARY KEY (GuildID, MemberID));"			
    	).run();
	}
	mDrop()
	{
		this.SQL.prepare
		(
      		"DROP TABLE IF EXISTS Mutes;"
    	).run();
	}
	mAllMutes(pGuildID)
	{
		return this.SQL.prepare
		(
			"SELECT rowid, * FROM Mutes WHERE GuildID = ?"
		).all(pGuildID);
	}
	mGetMutes(pGuildID, pMemberID)
	{
		return this.SQL.prepare
		(
			"SELECT rowid, * FROM Mutes WHERE GuildID = ? AND MemberID = ?"
		).get(pGuildID, pMemberID);
	}
	mSetMutes(pValues)
	{
		this.SQL.prepare
		(
			"INSERT OR REPLACE INTO Mutes (GuildID, GuildName, MemberID, MemberTag, Date) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @Date)"
		).run(pValues);
	}
	mDelMutes(pGuildID, pMemberID)
	{
		this.SQL.prepare
		(
			"DELETE FROM Mutes WHERE GuildID = ? AND MemberID = ?"
		).run(pGuildID, pMemberID);
	}
}

module.exports = MutesTable;