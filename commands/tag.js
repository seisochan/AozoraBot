const { Op } = require('sequelize');
const moment = require('moment');
const Tag = require('../models').Tag;
const { roles } = require('../config.js');

module.exports = {
  name: 'tag',
  description: 'Just like Nadeko or Dyno, saving your tag for memes',
  async execute(message, args) {
    moment.locale('id');
    const timeFormat = 'Do MMMM YYYY, HH:mm';
    const help =
      '```HELP LIST\n1. create/add [keyword] [content]: Menambahkan tag baru\n2. edit [keyword] [content]: Mengupdate tag\n3. delete [keyword] : Menghapus tag\n4. list : Menampilkan list tag yang sudah dibuat olehmu\n5. tags: Menampilkan keseluruhan tag\n6. search [keyword] : Mencari tag berdasarkan keyword\n7. info [keyword] : Menampilkan informasi tag ```';
    const checkMinLength = (keyword) => {
      if (keyword.length < 3) {
        message.reply('Keyword tag minimal 3 karakter ya...');
        return true;
      }
      return false;
    };
    if (args.length > 0) {
      switch (args[0]) {
        case 'create':
        case 'add':
          try {
            if (!args[1] || !args[2]) {
              return message.reply('Isi keyword dan kontennya ya...');
            }
            if (checkMinLength(args[1])) return;
            const tag = await Tag.findOne({ where: { command: args[1] } });
            if (tag) {
              return message.channel.send('Tag `' + args[1] + '` sudah ada');
            }
            await Tag.create({
              command: args[1],
              response: args.slice(2, args.length).join(' '),
              createdBy:
                message.author.username + '#' + message.author.discriminator,
              updatedBy:
                message.author.username + '#' + message.author.discriminator,
            });
            return await message.channel.send(
              'Tag `' + args[1] + '` berhasil dibuat!'
            );
          } catch (err) {
            console.log(err);
            return message.reply(
              `Ada sesuatu yang salah, tapi itu bukan kamu: ${err.message}`
            );
          }
        case 'list':
          try {
            const lists = await Tag.findAll({
              where: {
                createdBy:
                  message.author.username + '#' + message.author.discriminator,
              },
              order: [['command', 'ASC']],
            });
            const listRes = await Tag.findAndCountAll({
              where: {
                createdBy:
                  message.author.username + '#' + message.author.discriminator,
              },
            });
            const listEmbed = {
              title: message.author.username + ' Tag Lists',
              description:
                lists.length !== 0
                  ? lists.map((list) => list.dataValues.command).join(', ')
                  : '*Tidak ada tags yang ditampilkan*',
              fields: [{ name: 'Total Tags', value: listRes.count.toString() }],
            };
            message.reply({ content: 'Tag List', embeds: [listEmbed] });
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
          return;
        case 'search':
          try {
            if (!args[1]) {
              return message.channel.send('Mau nyari apa hayoo?');
            }
            if (checkMinLength(args[1])) return;
            const result = await Tag.findAll({
              where: {
                command: { [Op.like]: `%${args[1]}%` },
              },
              order: [['command', 'ASC']],
            });
            const totalRes = await Tag.findAndCountAll({
              where: {
                command: { [Op.like]: `%${args[1]}%` },
              },
              order: [['command', 'ASC']],
            });
            const resultEmbed = {
              title: 'Tag Search Results',
              description:
                result.length !== 0
                  ? result.map((res) => res.dataValues.command).join(', ')
                  : '*Tidak ada hasil yang ditampilkan*',
              fields: [
                { name: 'Total Tags', value: totalRes.count.toString() },
              ],
            };
            return message.channel.send({
              content: 'Hasil Pencarian Tag',
              embeds: [resultEmbed],
            });
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
        case 'edit':
          if (!args[1] || !args[2]) {
            return message.reply('Isi keyword dan kontennya ya...');
          }
          try {
            const tag = await Tag.findOne({ where: { command: args[1] } });
            if (!tag) {
              return message.channel.send(
                'Tidak ada tag `' + args[1] + '` yang ditemukan'
              );
            }
            if (
              tag.createdBy !==
              message.author.username + '#' + message.author.discriminator
            ) {
              return message.reply('Waduh, kamu siapa ya?');
            }
            tag.response = args.slice(2, args.length).join(' ');
            tag.updatedBy =
              message.author.username + '#' + message.author.discriminator;
            await tag.save();
            return message.channel.send(
              'Tag `' + args[1] + '` berhasil diubah!'
            );
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
        case 'delete':
          if (!args[1]) {
            return message.reply('Isi keyword yang mau di delete nya ya...');
          }
          try {
            const tag = await Tag.findOne({ where: { command: args[1] } });
            if (tag) {
              if (
                tag.createdBy ===
                  message.author.username +
                    '#' +
                    message.author.discriminator ||
                message.member.roles.some((r) => roles.live.includes(r.name))
              ) {
                await Tag.destroy({ where: { command: args[1] } });
                return message.channel.send(
                  'Tag `' + args[1] + '` berhasil dihapus'
                );
              } else {
                return message.reply('Waduh, kamu siapa ya?');
              }
            } else {
              return message.channel.send(
                'Tidak ada tag `' + args[1] + '` yang ditemukan'
              );
            }
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
        case 'info':
          try {
            const tag = await Tag.findOne({ where: { command: args[1] } });
            if (tag) {
              const embed = {
                title: `Info tag untuk ${tag.command}`,
                fields: [
                  {
                    name: 'Tag Name',
                    value: tag.command,
                  },
                  {
                    name: 'Created By',
                    value: tag.createdBy,
                    inline: true,
                  },
                  {
                    name: 'Created At',
                    value: moment(tag.createdAt)
                      .utcOffset('+07:00')
                      .format(timeFormat).toString(),
                    inline: true,
                  },
                  {
                    name: 'Times used',
                    value: tag.count.toString(),
                  },
                ],
              };
              return message.channel.send({ content: 'Info Tag', embeds: [embed] });
            } else {
              return message.channel.send(
                'Tidak ada tag `' + args[1] + '` yang ditemukan'
              );
            }
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
        case 'help':
          return message.channel.send(help);
        case 'tags':
          return message.channel.send('Gunakan perintah `!!tags` saja');
        case 'rank':
          try {
            const tags = await Tag.findAll({
              order: [['count', 'DESC']],
            });
            const rank = tags.slice(0, 10);
            const rankEmbed = {
              title: 'Top 10 Most Used Tags',
              description: rank
                .map(
                  (r, i) =>
                    `${i + 1}. **${r.command}** - Created by **${
                      r.createdBy
                    }**\nUsed **${r.count}** times`
                )
                .join('\n\n'),
            };
            return message.channel.send({ embed: rankEmbed });
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
        default:
          try {
            const tag = await Tag.findOne({ where: { command: args[0] } });
            if (tag) {
              tag.count = tag.count + 1;
              await tag.save();
              return message.channel.send(tag.response);
            } else {
              return message.channel.send(
                'Tidak ada tag `' + args[0] + '` yang ditemukan'
              );
            }
          } catch (err) {
            console.log(err);
            return message.reply(
              'Ada sesuatu yang salah tapi itu bukan kamu: ' + err.message
            );
          }
      }
    } else {
      return message.channel.send(help);
    }
  },
};
