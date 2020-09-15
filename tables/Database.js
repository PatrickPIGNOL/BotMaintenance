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

const WarnsTable = require("./WarnsTable.js");
const RaidsTable = require("./RaidsTable.js");
const ParametersTable = require("./ParametersTable.js");
const AutorolesTable = require("./AutorolesTable.js");
const ReglementsTable = require("./ReglementsTable.js")
const MutesTable = require("./MutesTable.js")

class Database
{
	constructor(pSQL)
	{
		this.aWarns = new WarnsTable(pSQL);
		this.aRaids = new RaidsTable(pSQL);
		this.aParameters = new ParametersTable(pSQL);
		this.aAutoroles = new AutorolesTable(pSQL);
		this.aReglements = new ReglementsTable(pSQL);
		this.aMutes = new MutesTable(pSQL);
		pSQL.pragma("synchronous = 1");
		pSQL.pragma("journal_mode = persist");
		pSQL.pragma("foreign_keys = ON");
	}
	get Warns()
	{
		return this.aWarns;
	}
	get Raids()
	{
		return this.aRaids;
	}
	get Parameters()
	{
		return this.aParameters;
	}
	get Autoroles()
	{
		return this.aAutoroles;
	}
	get Reglements()
	{
		return this.aReglements;
	}
	get Mutes()
	{
		return this.aMutes;
	}
}

module.exports = Database;