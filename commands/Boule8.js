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

const Command = require("../Command.js");
class Boule8 extends Command 
{
	constructor() 
	{
		super(
			"boule8",
			["8ball"],
			[],
			1,
			0,
			"boule8 <Question fermée ?>",
			"La boule 🎱 donne à ta question fermée une réponse aléatoire ?",
			true,
			0
		);
	}
	async mExecute(pDiscordBot, message, args) 
	{
		super.mExecute(pDiscordBot, message, args);
		const vMember = message.mentions.members.first();
		if (this.aMentions && !vMember) 
		{
			const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
				.setAuthor(
				pDiscordBot.aClient.user.username,
				pDiscordBot.aClient.user.displayAvatarURL(),
				pDiscordBot.aConfig.URL
				)
				.setTitle("**Erreur**")
				.setColor(pDiscordBot.aConfig.Bad)
				.setThumbnail(vMember.user.displayAvatarURL());
			message.reply("Vous devez mentionner un membre.");
			message.delete();
			return;
		}
		if(this.aArgs && !args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		if (this.aGuildOnly && message.channel.type !== "text") 
		{
			return message.reply("I can't execute that command inside DMs!");
		}

		const vRandom = Math.floor(Math.random() * 24);
		
		let vTextes = [
			"Essaye plus tard",
			"D'après moi oui",
			"C'est non",
			"Essaye encore",
			"C'est certain",
			"Peu probable",
			"Pas d'avis",
			"Oui absolument",
			"Faut pas rêver",
			"C'est ton destin",      
			"Tu peux compter dessus",
			"N'y compte pas",
			"Le sort en est jeté",
			"Oui",
			"Impossible",
			"Une chance sur deux",
			"Sans aucun doute",
			"Ça sent mauvais",
			"Repose ta question",
			"Très probable",
			"Très improbable",
			"Il manque un paramètre",
			"C'est bien parti",
			"Mieux vaut oublier"
		];
		
		const vEmbed = new pDiscordBot.aDiscord.MessageEmbed()
		.setAuthor(
			message.author.username,
			message.author.displayAvatarURL()
		)
		.setColor(pDiscordBot.aConfig.Good)
		.setTitle("** La boule 🎱 **")
		.setDescription("A la question : ***« " + args.join(" ") + " »***\nLa boule 🎱 à répondu : ***« " + vTextes[vRandom] + " »***");
		message.channel.send(vEmbed);
		message.delete();
	}
}

module.exports = new Boule8();