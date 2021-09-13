const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send('this is web page')
})

app.listen(3000, () => {
  console.log("All is ok!")
})

let Discord = require("discord.js");
let client = new Discord.Client();

//custome presence
 client.on("ready", () => {
  client.user.setPresence({ activity: { name: 'custome text', type: 'PLAYING' }, status: "dnd" }) 
})
//type is can be PLAYING, LISTENING, WATCHING and STREAMING

const prefix = "CUSTOME PREFIX";
client.on("message", async message => {
  // 800015155093700658
  // 860495990359588896
  if(!message.content.startsWith(prefix) || message.author.bot) {
    return
  }
  var args = message.content.slice(prefix.length).split(/ +/);
  var command = args.shift().toLowerCase();
  var argsf = String(args);
  //otázka

	if(message.content === "help") {
    
  let embed = new Discord.MessageEmbed()
  .setTitle("random text")
  .setTimestamp()
  .setDescription("random text")
  .setColor("random_color")
  .setTimestamp()
  .setFooter(message.author.username)
  message.channel.send(embed)
}
// \n create you next line

  if(command === "poll" || command === "otázka") {
    var argumenty = String(message.content.slice(command.length + 2));
    var argumenty2 = argumenty.split("_");
    var otazka = argumenty2[0];
    var odp1 = argumenty2[1];
    var odp2 = argumenty2[2];
    var pingPingRole = argumenty2[3];

    if(!otazka || !odp1 || !odp2) {
      var embed = new Discord.MessageEmbed()
      .setColor("#f14646")
      .setTitle("Špatné použití příkazu")
      .addFields(
        {name: "**Použij příkaz**", value: ".otázka <otázka>**_**<odpověď 1>**_**<odpověď 2>"},
        {name: "**Například**", value: "!poll Jsi holka nebo kluk?**_**holka**_**kluk"}
      )
      return message.channel.send(embed);
    }

    var emoji1 = "🟢";
    var emoji2 = "🔴";
    var embed = new Discord.MessageEmbed()
    .setColor("#2453ff")
    .setTitle(otazka)
    .setDescription(`${emoji1} ${odp1}\n\n${emoji2} ${odp2}`)
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(emoji1);
    messageEmbed.react(emoji2);
    message.delete({timeout: 300});
  }
   //slowmode
    if(command === "slowmode") {
    if(message.member.hasPermission("MANAGE_CHANNELS") || message.member.hasPermission("MANAGE_MESSAGES")) {
      var slowmodetime = args[0];
      if(!slowmodetime || isNaN(slowmodetime)) {
        var embed = new Discord.MessageEmbed()
        .setColor("#f14646")
        .setTitle("Špatné použití příkazu")
        .addFields(
          {name: "**Použij příkaz**", value: "!slowmode <doba slowmodu> <důvod>"},
          {name: "**Například**", value: "!slowmode 3 Test"}
        )
        return message.channel.send(embed);
      }
      var duvod = message.content.slice(args[0].length + command.length + 3);
      if(!duvod) {
        var embed = new Discord.MessageEmbed()
        .setColor("#f14646")
        .setTitle("Špatné použití příkazu")
        .addFields(
          {name: "**Použij příkaz**", value: "!slowmode <doba slowmodu> <důvod>"},
          {name: "**Například**", value: "!slowmode 3 Test"}
        )
        return message.channel.send(embed);
      }
      message.channel.setRateLimitPerUser(slowmodetime, duvod);
      var embed = new Discord.MessageEmbed()
      .setColor("#24ff41")
      .setDescription(`Slowmode je těď nastaven na **${slowmodetime}** sekund\nDůvod: **${duvod}**`)
      return message.channel.send(embed);
      message.delete({timeout: 300});
  } else {
    var embed = new Discord.MessageEmbed()
    .setColor("#f14646")
    .setDescription(`Nemáš oprávnění na tenhle příkaz :sob:`)
  }}
  if (command === "clear") {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      var cleardata = args[0];
      var fcleardata = 1 + parseInt(cleardata);
      if (!cleardata) {
        var embed = new Discord.MessageEmbed()
          .setColor("#f14646")
          .setTitle("Bad usage of command")
          .addFields(
            { name: "**Use**", value: prefix + "clear <how much messages to clear>" },
            { name: "**For Example**", value: prefix + "clear 10" }
          )
        return message.channel.send(embed);
      }
      var embed = new Discord.MessageEmbed()
        .setColor("#f14646")
        .setTitle("Bad usage of command")
        .addFields(
          { name: "**Použij příkaz**", value: prefix + "clear <how much messages to clear>" },
          { name: "**Například**", value: prefix + "clear 10" }
        )
      if (isNaN(cleardata)) return message.channel.send(embed);
      if (cleardata > 100) return message.channel.send(`You can't delete more than 100 messages `);
      if (cleardata < 1) return message.channel.send(`You can't delete less than 1 message `);
      message.channel.messages.fetch({ limit: fcleardata }).then(messages => {
        message.channel.bulkDelete(messages);
      });
    } else {
      var embed = new Discord.MessageEmbed()
        .setColor("#f14646")
        .setDescription(`You don't have permission to do that :sob:`)
      return message.channel.send(embed);
    }
  }
    if (command === "stats") {
    let embed;
    try {
      let boosts = message.guild.premiumSubscriptionCount;
      let onlineBots = message.guild.members.cache.filter(member => member.user.bot && member.presence.status !== "offline").size
      let bots = message.guild.members.cache.filter(member => member.user.bot).size;
      let totalMembers = message.guild.memberCount - bots;
      let offline = message.guild.members.cache.filter(member => member.presence.status == "offline").size;
      let online = message.guild.members.cache.filter(member => member.presence.status !== "offline").size - onlineBots;
      embed = new Discord.MessageEmbed()
        .setColor("#2453ff")
        .setTitle(message.guild.name + " - statistics")
        .setDescription(`lidé+Boti: **${bots + totalMembers}**\nBotů: **${bots}**\nlidí: **${totalMembers}**\nOnline lidí: **${online}**\nOffline lidí: **${offline}**\nBoostů: **${boosts}**\nkanálů: **${message.guild.channels.cache.size}**\nText kanálů: **${message.guild.channels.cache.filter((c) => c.type === "text").size}**\nVoice kanálů: **${message.guild.channels.cache.filter((c) => c.type === "voice").size}**\nCategories: **${message.guild.channels.cache.filter((c) => c.type === "category").size}**\nRolí: **${message.guild.roles.cache.size}**`)
    } catch (error) {
      embed = new Discord.MessageEmbed()
        .setColor("#f14646")
        .setTitle("ERROR")
        .setDescription(error)
    }
    message.channel.send(embed);

  }
});
client.login("token-here")
