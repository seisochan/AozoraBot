'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    title: DataTypes.STRING,
      youtubeUrl: DataTypes.STRING,
      dateTime: DataTypes.DATE,
      vtuberId: DataTypes.INTEGER,
      type: DataTypes.ENUM("live", "premiere"),
      thumbnailUrl: DataTypes.STRING
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Vtuber, { foreignKey: "vtuberId", as: "vtuber" });
  };
  return Schedule;
};