const SequelizeSlugify = require("sequelize-slugify");

const EventModel = (sequelize, DataTypes) => {
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
    email: {
      type: DataTypes.INTEGER,
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
        isAfter: "2021-02-09",

        //   customValidator(startDate) {
        //       if (startDate === null ) {
        //           throw new Error("name can't be null unless age is 10");
        //       }
        //  }
      },
    },

    endDate: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });

  SequelizeSlugify.slugifyModel(Product, { source: ["name"] });

  return Event;
};

module.exports = EventModel;
