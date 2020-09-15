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
class AutorolesTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare(
      		"CREATE TABLE IF NOT EXISTS Autoroles (GuildID TEXT, GuildName TEXT, Type TEXT, RoleID TEXT, RoleName TEXT, PRIMARY KEY (GuildID, Type, RoleID));"
    	).run();
	}
	mDrop()
	{
		this.SQL.prepare(
      		"DROP TABLE IF EXISTS Autoroles;"
    	).run();
	}
	mAllAutoroles(pGuildID, pType)
    {
		return this.SQL.prepare(
      		"SELECT * FROM autoroles WHERE GuildID = ? AND Type = ?"
    	).all(pGuildID, pType);
	}
	mSetAutoroles(pValues)
	{
		this.SQL.prepare(
			"INSERT OR REPLACE INTO autoroles (GuildID, GuildName, Type, RoleID, RoleName) VALUES (@GuildID, @GuildName, @Type, @RoleID, @RoleName)"
		).run(pValues);
	}
	mDelAutoroles(pValues)
	{
		this.SQL.prepare(
			"DELETE FROM autoroles WHERE GuildID = @GuildID AND Type = @Type AND RoleID = @RoleID"
		).run(pValues);
	}
}

module.exports = AutorolesTable;