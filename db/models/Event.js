const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      validate: {
        len: [20],
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notContains: "event",
      },
    },
    slug: { type: DataTypes.STRING, unique: true },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    numOfSeats: {
      type: DataTypes.STRING,
      validate: {
        min: 1,
      },
    },
    bookedSeats: {
      type: DataTypes.STRING,

      isGreaterThanOtherField(numOfSeats) {
        if (parseInt(numOfSeats) >= parseInt(bookedSeats)) {
          throw new Error("numOfSeats must be greater than otherField.");
        }
      },
    },
    startDate: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
        isAfter: "02-01-2015",
      },
    },
    endDate: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });
  SequelizeSlugify.slugifyModel(Event, {
    source: ["name"],
  });
  return Event;
};
