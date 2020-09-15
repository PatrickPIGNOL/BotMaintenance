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
class WarnsTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare(
      		"CREATE TABLE IF NOT EXISTS Warns (GuildID TEXT, GuildName TEXT, MemberID TEXT, MemberTag TEXT, ModeratorID TEXT, ModeratorTag TEXT, Date TEXT, Reason TEXT);"
    	).run();
	}
	mDrop()
	{
		this.SQL.prepare(
      		"DROP TABLE IF EXISTS Warns;"
    	).run();
	}
	mAllWarns(pGuildID)
	{
		return this.SQL.prepare(
			"SELECT rowid, * FROM Warns WHERE GuildID = ? ORDER BY MemberTag ASC, Date DESC"
		).all(pGuildID);
	}
	mSetWarns(pValues)
	{
		this.SQL.prepare(
			"INSERT OR REPLACE INTO Warns (GuildID, GuildName, MemberID, MemberTag, ModeratorID, ModeratorTag, Date, Reason) VALUES (@GuildID, @GuildName, @MemberID, @MemberTag, @ModeratorID, @ModeratorTag, @Date, @Reason)"
		).run(pValues);
	}
	mDelWarns(pRowID)
	{
		this.SQL.prepare(
			"Delete FROM Warns WHERE rowid = ?"
		).run(pRowID);
	}
}

module.exports = WarnsTable;