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
class ParametersTable extends Table
{
	constructor(pSQL)
	{
		super(pSQL);
		this.mCreate();
	}
	mCreate()
	{
		this.SQL.prepare(
			"CREATE TABLE IF NOT EXISTS Parameters (GuildID TEXT, GuildName TEXT, ParameterName TEXT, ParameterValue TEXT, PRIMARY KEY(GuildID, ParameterName));"
		).run();
	}
	mDrop()
	{
		this.SQL.prepare(
			"DROP TABLE IF EXISTS Parameters;"
		).run();
	}
	mAllParameters(pGuildID)
	{
		return this.SQL.prepare(
			"SELECT * FROM Parameters WHERE GuildID = ?"
 		).all(pGuildID);
	}
	mParameter(pGuildID, pParameterName)
	{
		return this.SQL.prepare(
			"SELECT * FROM Parameters WHERE GuildID = ? AND ParameterName = ?"
		).get(pGuildID, pParameterName);
	}
	mSetParameters(pValues)
	{
		this.SQL.prepare(
			"INSERT OR REPLACE INTO Parameters (GuildID, GuildName, ParameterName, ParameterValue) VALUES (@GuildID, @GuildName, @ParameterName, @ParameterValue)"
		).run(pValues);
	}
}

module.exports = ParametersTable;