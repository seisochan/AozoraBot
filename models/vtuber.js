'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vtuber = sequelize.define(
    'Vtuber',
    {
      name: DataTypes.STRING,
      fullName: DataTypes.STRING,
      fanName: DataTypes.STRING,
      color: DataTypes.STRING,
      avatarURL: DataTypes.STRING,
      channelURL: DataTypes.STRING,
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    }
  );
  Vtuber.associate = function (models) {
    // associations can be defined here
  };
  return Vtuber;
};
