module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
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

      isGreaterThanOtherField(value) {
        if (parseInt(value) >= parseInt(this.numOfSeats)) {
          throw new Error("numOfSeats must be greater than otherField.");
        }
      },
      Aretheytheyequalled(value) {
        if (value === this.bookedSeats) {
          //error
          throw new Error("They are equalled");
        }
        console.log();
      },
    },
    startDate: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
        isAfter: "10-02-2021",
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
