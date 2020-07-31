const Discord = require('discord.js');
const config = require('./config.json');

// Use this to interact with the Discord API and
//how Discord will notify you of events such as new messages.
// The client, in effect, represents the Discord bot.
const client = new Discord.Client(); // Creates a new Discord.Client

// Constants
const prefix = '!';

// Verifies login.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Detect and receive any messages users send.
client.on('message', function (message) {
  // Checks if the author of the message is a bot, and if so, stops processing the command.
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    console.log(`A COMMAND was sent: ${message.content} (from ${message.author.username})`);

    const commandBody = message.content.slice(prefix.length); // Remove the prefix.
    const args = commandBody.split(' '); // Split arguments into elements of an array.
    const command = args.shift().toLowerCase(); // Get the command string

    if (command === 'ping') {
      // Calculates the difference between the current time
      //and the timestamp when the message was created in milliseconds.
      const timeTaken = message.createdTimestamp - Date.now();
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === 'sum') {
      const numArgs = args.map((x) => parseFloat(x)); // Create a list of numbers.
      const sum = numArgs.reduce((counter, x) => (counter += x));
      message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
  } else {
    console.log(`A MESSAGE was sent: ${message.content} (from ${message.author.username})`);
  }
});

// The token lets the Discord API know which bot the program is for
//and that you're authenticated to use the bot.
client.login(config.BOT_TOKEN);
