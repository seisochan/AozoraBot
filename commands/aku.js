const config = require('../config.js');

module.exports = {
  name: 'aku',
  description: 'Joke bapacc bapacc',
  execute(message, args) {
    if (args.length > 0) {
    const StringCoba = args.join(' ');
      message.channel.send(`Halo ${StringCoba}, aku BotEpel`);
      return;
    }
    return message.reply('Aku siapa?');
  },
};