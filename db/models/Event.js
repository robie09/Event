module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [1, 20],
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notContains: "event",
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    numOfSeats: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      validate: {
        isGreaterThanOtherField(value) {
          if (parseInt(value) > parseInt(this.numOfSeats)) {
            throw new Error(
              `number of seats ${this.numOfSeats} must be greater than ${this.bookedSeats}.`
            );
          }
        },
      },
    },
    startDate: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
        isAfter: "02-10-2021",
        customValidator(value) {
          if (value === null && this.endDate == null) {
            //error
            throw new Error("The  StartDate is Empty");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
        customValidator(value) {
          if (value === null && this.startDate == null) {
            throw new Error("The  EndDate is Empty");
          }
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isUrl: true,
      },
    },
  });

  return Event;
};
