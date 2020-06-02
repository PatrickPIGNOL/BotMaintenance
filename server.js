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
const DiscordBot = require("./discordbot.js");
DiscordBot.mLogin();

const express = require("express");
const app = express();
app.use(express.static("public"));

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function mHTMLHeader() 
{
  let vHTML =
    "<!DOCTYPE html>" +
    "<html lang='fr'>" +
    "<head>" +
    "<meta charset='utf-8'>" +
    "<title>";
  vHTML += DiscordBot.Client.user.username;  
  vHTML +=
    "</title>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<meta name='description' content='A cool thing made with Glitch'>" +
    "<link id='favicon' rel='icon' href='";
  vHTML += DiscordBot.Client.user.displayAvatarURL();
  vHTML +=
    "' type='image/x-icon'>" +
    "<!-- import the webpage's stylesheet -->" +
    "<link rel='stylesheet' href='/style.css'>" +
    "</head>" +
    "<body bgcolor='#303030'>";
  return vHTML;
}

function mHTMLFooter()
{
  let vHTML = "</table></body></html>";
  return vHTML;
}

app.get("/", (request, response) => 
{
  let vHTML = mHTMLHeader();
  vHTML += `</H1><img src='${DiscordBot.Client.user.displayAvatarURL()}' width='50'>${DiscordBot.Client.user.username} on line ...</H1>`;   
  vHTML += mHTMLFooter();
  response.send(vHTML);
});

// Page designed to be used with uptimerobot.com to check if the bot is available or not ...
app.get("/monitor", (request, response) => 
{
  let vHTML = mHTMLHeader();
  vHTML += `</H1><img src='${DiscordBot.Client.user.displayAvatarURL()}' width='50'>${DiscordBot.Client.user.username} on line ...</H1>`;   
  vHTML += mHTMLFooter();
  response.send(vHTML);
});

